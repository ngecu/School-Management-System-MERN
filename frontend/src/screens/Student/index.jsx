const calendarEvents = [];

// Iterate through each day of the month
for (let day = 1; day <= new Date(currentYear, currentMonth + 1, 0).getDate(); day++) {
  timetableEvents.forEach((timetableItem) => {
    const {
      _id,
      course: { name: courseName },
      courseUnit: { name: courseUnitName },
      lecturer: { firstName: lecturerFirstName, lastName: lecturerLastName },
      year,
      dayOfWeek,
      lecturerRoom,
      startTime,
      endTime,
    } = timetableItem;

    // Combine lecturer's first and last name
    const lecturerFullName = `${lecturerFirstName} ${lecturerLastName}`;

    // Replace the year, month, and day parts with the current year, current month, and current day
    const startDate = new Date(`${currentYear}-${currentMonth + 1}-${day}T${startTime}`);
    const endDate = new Date(`${currentYear}-${currentMonth + 1}-${day}T${endTime}`);

    // Set the day of the week for startDate and endDate
    setDayOfWeek(startDate, dayOfWeek);
    setDayOfWeek(endDate, dayOfWeek);

    function setDayOfWeek(date, day) {
      // Convert day of the week string to a number (0 for Sunday, 1 for Monday, etc.)
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayNumber = days.indexOf(day);

      // Set the day of the week
      date.setDate(date.getDate() - (date.getDay() - dayNumber + 7) % 7);
    }

    // Format the title for the event
    const title = `${courseUnitName} - ${lecturerFullName}`;

    // Add the event to the calendarEvents array
    calendarEvents.push({
      id: _id,
      title,
      start: startDate,
      end: endDate,
    });
  });
}

console.log(calendarEvents);