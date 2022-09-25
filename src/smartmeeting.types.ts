const Status = { free: "Free", busy: "Busy", away: "Away" };

export interface Timeline {
  date: string;
  startTime: string;
  endTime: string;
}

export interface Attendee {
  id: string;
  name: string;
  role: string;
  status: keyof typeof Status;
}

export interface Meeting {
  id: string;
  buildingId?: string;
  meetingRoomId: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  host: Attendee | "";
  attendees: Attendee[];
}

export interface MeetingRoom {
  id: string;
  buildingId: string;
  floor: number;
  name: string;
  isFree: boolean;
  bookedSlots: Timeline[];
  availableSlots: Timeline[];
}

export interface Buidling {
  id: string;
  name: string;
  meetingRooms: MeetingRoom[];
  meetings: Meeting[];
}
