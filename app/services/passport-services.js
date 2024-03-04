const passport = require("passport");
const WebAuthnStrategy = require("passport-fido2-webauthn");

const db = require("../../db/helpers/init");
const models = require("../models");

class PassportService {
  init(store) {
    passport.use(this.useWebAuthnStrategy(store));
  }
  useWebAuthnStrategy(store) {
    return new WebAuthnStrategy({ store: store }, this.verify, this.register);
  }
  async verify(id, userHandle, done) {
    const transaction = await db.transaction();
    try {
      const currentCredentials = await models.PublicKeyCredential.findOne(
        {
          where: { external_id: id },
        },
        { transaction }
      );
      if (currentCredentials === null) {
        return done(null, false), { message: "Invalid key," };
      }

      const currentUser = await models.User.findOne(
        {
          where: { id: currentCredentials.user_id },
        },
        { transaction }
      );
      if (currentUser === null) {
        return done(null, false), { message: "Invalid user," };
      }
      if (Buffer.compare(currentUser.user_handle, userHandle) !== 0) {
        return done(null, false), { message: "Handles do not match," };
      }
      await transaction.commit();
      return done(null, currentCredentials, currentCredentials.public_key);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = PassportService;
