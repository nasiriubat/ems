const BackendSettings = require('../models/backendSetting');

exports.updateSetting = async function (req, res) {
  try {
    const { key, value } = req.body;

    let setting = await BackendSettings.findOne({ key });
    if (!setting) {
      setting = new BackendSettings({ key, value });
    } else {
      setting.value = value;
    }

    await setting.save();
    res.status(200).send({ message: 'Setting updated successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getSettings = async function (req, res) {
  try {
    const settings = await BackendSettings.find({});
    res.status(200).send(settings);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching settings.' });
  }
};
