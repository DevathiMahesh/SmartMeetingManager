import { Attendee, Buidling, Meeting, MeetingRoom } from "./smartmeeting.types";

export let attendees: Attendee[] = [
  {
    id: "att1",
    name: "Mahesh",
    role: "Manager",
    status: "busy"
  },
  {
    id: "att2",
    name: "Ajay",
    role: "Senior Software Engineer",
    status: "free"
  },
  {
    id: "att3",
    name: "Shashank",
    role: "Intern",
    status: "away"
  },
  {
    id: "att4",
    name: "varun",
    role: "Team Lead",
    status: "free"
  }
];

let meetingRooms: MeetingRoom[] = [
  {
    id: "room1",
    buildingId: "bd1",
    name: "Aryabhatta",
    floor: 1,
    isFree: true,
    bookedSlots: [
      { date: "09-24-2022", startTime: "11:00", endTime: "12:00" },
      { date: "09-24-2022", startTime: "16:30", endTime: "17:30" }
    ],
    availableSlots: [
      { date: "09-24-2022", startTime: "10:00", endTime: "11:00" },
      { date: "09-24-2022", startTime: "12:00", endTime: "13:00" },
      { date: "09-25-2022", startTime: "19:00", endTime: "20:00" }
    ]
  },
  {
    id: "room2",
    buildingId: "bd2",
    name: "newton",
    floor: 2,
    isFree: false,
    bookedSlots: [{ date: "09-24-2022", startTime: "11:00", endTime: "12:00" }],
    availableSlots: [
      { date: "09-24-2022", startTime: "10:00", endTime: "11:00" },
      { date: "09-25-2022", startTime: "19:00", endTime: "20:00" }
    ]
  },
  {
    id: "room3",
    buildingId: "bd3",
    name: "Einstein",
    floor: 3,
    isFree: false,
    bookedSlots: [{ date: "09-24-2022", startTime: "11:00", endTime: "12:00" }],
    availableSlots: [
      { date: "09-24-2022", startTime: "10:00", endTime: "11:00" },
      { date: "09-25-2022", startTime: "17:30", endTime: "18:30" }
    ]
  },
  {
    id: "room4",
    buildingId: "bd1",
    name: "Turing",
    floor: 4,
    isFree: false,
    bookedSlots: [],
    availableSlots: [
      { date: "09-24-2022", startTime: "10:00", endTime: "11:00" }
    ]
  }
];

let buildings: Buidling[] = [
  {
    id: "bd1",
    name: "Nexus",
    meetings: [
      {
        id: "meet1",
        meetingRoomId: meetingRooms[0].id,
        title: "Sprint Planning",
        date: "09-25-2022",
        startTime: "18:00",
        endTime: "19:30",
        host: attendees[0],
        attendees: [attendees[0], attendees[2], attendees[3]]
      },
      {
        id: "meet2",
        meetingRoomId: meetingRooms[0].id,
        title: "Tech Talk",
        date: "09-25-2022",
        startTime: "11:00",
        endTime: "12:00",
        host: attendees[3],
        attendees: [attendees[1], attendees[2]]
      }
    ],
    meetingRooms: [meetingRooms[0], meetingRooms[3]]
  },
  {
    id: "bd2",
    name: "Pheonix",
    meetings: [
      {
        id: "meet3",
        meetingRoomId: meetingRooms[1].id,
        title: "Weekly Syncup",
        date: "09-24-2022",
        startTime: "11:00",
        endTime: "12:00",
        host: attendees[2],
        attendees: [attendees[1], attendees[3]]
      }
    ],
    meetingRooms: [meetingRooms[1]]
  },
  {
    id: "bd3",
    name: "Arena",
    meetings: [
      {
        id: "meet4",
        meetingRoomId: meetingRooms[2].id,
        title: "Bug Bash",
        date: "09-24-2022",
        startTime: "11:00",
        endTime: "01:00",
        host: attendees[0],
        attendees: [attendees[1], attendees[2], attendees[3]]
      }
    ],
    meetingRooms: [meetingRooms[2]]
  }
];

export function fetchAllBuildings() {
  return Promise.resolve(buildings);
}

export function addMeeting(newMeeting: Meeting) {
  let building = buildings.find((x) => x.id === newMeeting.buildingId);
  building?.meetings?.push(newMeeting);
}
