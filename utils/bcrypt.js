const bcrypt = require('bcryptjs');

const encrypter = async (data) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data, salt);
    return hash;
};

const compare = async (hash, data) => {
    return await bcrypt.compare(data, hash);
};

module.exports = {
    compare,
    encrypter
};
