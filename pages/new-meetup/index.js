import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetup() {
  const addMeetupHandler = async (meetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meetupData),
    });

    const data = await response.json();
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetup;
