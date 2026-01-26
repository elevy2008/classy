// Mock data for demo version - no database required

export const mockStudentUser = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  role: 'STUDENT',
  bookings: [
    {
      id: '1',
      date: new Date(Date.now() + 86400000 * 2), // 2 days from now
      startTime: '14:00',
      endTime: '15:00',
      status: 'CONFIRMED',
      notes: 'Need help with calculus homework',
      teacher: {
        id: '2',
        name: 'Dr. Sarah Smith',
        email: 'sarah.smith@university.edu',
        image: 'https://ui-avatars.com/api/?name=Sarah+Smith&background=667eea&color=fff',
      },
      officeHour: {
        id: '1',
        title: 'Math Office Hours',
        location: 'Room 304',
      },
    },
    {
      id: '2',
      date: new Date(Date.now() + 86400000 * 5), // 5 days from now
      startTime: '10:00',
      endTime: '10:30',
      status: 'CONFIRMED',
      notes: 'Discussion about final project',
      teacher: {
        id: '3',
        name: 'Prof. Michael Chen',
        email: 'michael.chen@university.edu',
        image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=764ba2&color=fff',
      },
      officeHour: {
        id: '2',
        title: 'CS Office Hours',
        location: 'Engineering Building 201',
      },
    },
    {
      id: '3',
      date: new Date(Date.now() - 86400000 * 3), // 3 days ago
      startTime: '13:00',
      endTime: '13:30',
      status: 'COMPLETED',
      notes: 'Physics lab questions',
      teacher: {
        id: '4',
        name: 'Dr. Emily Davis',
        email: 'emily.davis@university.edu',
        image: 'https://ui-avatars.com/api/?name=Emily+Davis&background=667eea&color=fff',
      },
      officeHour: {
        id: '3',
        title: 'Physics Help',
        location: 'Science Center 105',
      },
    },
  ],
  schedules: [
    {
      id: '1',
      dayOfWeek: 1,
      startTime: '09:00',
      endTime: '10:30',
      subject: 'Calculus II',
      location: 'Math Building 201',
    },
    {
      id: '2',
      dayOfWeek: 1,
      startTime: '14:00',
      endTime: '15:30',
      subject: 'Computer Science',
      location: 'Engineering 304',
    },
    {
      id: '3',
      dayOfWeek: 3,
      startTime: '11:00',
      endTime: '12:30',
      subject: 'Physics Lab',
      location: 'Science Center 105',
    },
  ],
};

export const mockTeacherUser = {
  id: '2',
  name: 'Dr. Sarah Smith',
  email: 'sarah.smith@university.edu',
  role: 'TEACHER',
  image: 'https://ui-avatars.com/api/?name=Sarah+Smith&background=667eea&color=fff',
  officeHours: [
    {
      id: '1',
      title: 'Math Office Hours',
      dayOfWeek: 2,
      startTime: '14:00',
      endTime: '16:00',
      location: 'Room 304',
      maxStudents: 3,
      isRecurring: true,
      bookings: [
        {
          id: '1',
          date: new Date(Date.now() + 86400000 * 2),
          startTime: '14:00',
          endTime: '15:00',
          status: 'CONFIRMED',
          student: {
            id: '1',
            name: 'Alex Johnson',
            email: 'alex.johnson@university.edu',
            image: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=764ba2&color=fff',
          },
        },
      ],
    },
    {
      id: '2',
      title: 'Calculus Help Session',
      dayOfWeek: 4,
      startTime: '10:00',
      endTime: '12:00',
      location: 'Math Building 201',
      maxStudents: 5,
      isRecurring: true,
      bookings: [],
    },
  ],
  teacherBookings: [
    {
      id: '1',
      date: new Date(Date.now() + 86400000 * 2),
      startTime: '14:00',
      endTime: '15:00',
      status: 'CONFIRMED',
      notes: 'Need help with calculus homework',
      student: {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex.johnson@university.edu',
        image: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=764ba2&color=fff',
      },
      officeHour: {
        id: '1',
        title: 'Math Office Hours',
        location: 'Room 304',
      },
    },
    {
      id: '4',
      date: new Date(Date.now() + 86400000 * 9),
      startTime: '10:30',
      endTime: '11:00',
      status: 'PENDING',
      notes: 'Questions about exam',
      student: {
        id: '5',
        name: 'Jessica Lee',
        email: 'jessica.lee@university.edu',
        image: 'https://ui-avatars.com/api/?name=Jessica+Lee&background=667eea&color=fff',
      },
      officeHour: {
        id: '2',
        title: 'Calculus Help Session',
        location: 'Math Building 201',
      },
    },
  ],
};
