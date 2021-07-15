import { Fragment } from "react";
import Head from "next/head";
import { ObjectId } from "mongodb";
import { openConnection } from "../../utils/db/connect";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetail {...props.meetupData} />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const meetupsCollection = await openConnection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  const paths = meetups.map((meetup) => ({
    params: {
      meetupId: meetup._id.toString(),
    },
  }));

  return {
    fallback: "blocking",
    paths,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const meetupsCollection = await openConnection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  return {
    props: {
      meetupData: {
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
