const Attendance = require('../models/Attendance');
const BackendSetting = require('../models/backendSetting');
const moment = require('moment');

async function getSettingValue(key) {
  const setting = await BackendSetting.findOne({ key });
  return setting ? setting.value : null;
}

exports.checkIn = async function (req, res) {
  try {
    const userId = req.user._id;
    const today = moment().startOf('day').toDate();
    const yesterday = moment().subtract(1, 'day').startOf('day').toDate();

    // Check if the user has already checked in today
    let attendance = await Attendance.findOne({ user: userId, date: today });
    if (attendance && attendance.checkIn) {
      return res.status(400).send({ message: 'Attendance already done for today.' });
    }

    // Auto check-out for yesterday if needed
    let yesterdayAttendance = await Attendance.findOne({ user: userId, date: yesterday });
    if (yesterdayAttendance && !yesterdayAttendance.checkOut) {
      const checkoutTimeValue = await getSettingValue('checkOutTime');
      if (!checkoutTimeValue) {
        return res.status(500).send({ message: 'Attendance settings not found.' });
      }
      const checkoutTime = moment(yesterday).set({
        hour: moment(checkoutTimeValue, 'HH:mm').hour(),
        minute: moment(checkoutTimeValue, 'HH:mm').minute(),
      }).toDate();
      yesterdayAttendance.checkOut = checkoutTime;
      await yesterdayAttendance.save();
    }

    // Check-in for today
    const checkInTimeValue = await getSettingValue('checkInTime');
    if (!checkInTimeValue) {
      return res.status(500).send({ message: 'Attendance settings not found.' });
    }
    const checkInTime = moment(today).set({
      hour: moment(checkInTimeValue, 'HH:mm').hour(),
      minute: moment(checkInTimeValue, 'HH:mm').minute(),
    }).toDate();

    attendance = new Attendance({
      user: userId,
      date: today,
      checkIn: new Date(),
      status: moment().isAfter(checkInTime) ? 'late' : 'in_time',
    });

    await attendance.save();
    res.status(200).send({ message: 'Check-in successful!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.checkOut = async function (req, res) {
  try {
    const userId = req.user._id;
    const today = moment().startOf('day').toDate();

    const attendance = await Attendance.findOne({ user: userId, date: today });

    if (!attendance || !attendance.checkIn) {
      return res.status(400).send({ message: 'Check-in not done for today.' });
    }

    if (attendance.checkOut) {
      return res.status(400).send({ message: 'Already checked out for today.' });
    }

    attendance.checkOut = new Date();
    await attendance.save();
    res.status(200).send({ message: 'Check-out successful!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getLateAttendances = async function (req, res) {
  try {
    const { date } = req.query;
    const targetDate = moment(date, 'YYYY-MM-DD').startOf('day').toDate();

    const lateAttendances = await Attendance.find({
      date: targetDate,
      status: 'late',
    }).populate('user', 'name email');

    res.status(200).send(lateAttendances);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching late attendances.' });
  }
};

exports.getAttendanceReport = async function (req, res) {
  try {
    const { userId } = req.params;
    const startDate = moment().subtract(60, 'days').startOf('day').toDate();
    const endDate = moment().endOf('day').toDate();

    const attendances = await Attendance.find({
      user: userId,
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: -1 });

    res.status(200).send(attendances);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching attendance report.' });
  }
};

exports.updateAttendanceStatus = async function (req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).send({ message: 'Attendance record not found.' });
    }

    attendance.status = status;
    await attendance.save();

    res.status(200).send({ message: 'Attendance status updated successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
