import ActivityCard from "./ActivityCard";

export default function ActivityList({ itineraryActivities }) {
  return (
    <div>
      Activity List
      <br />
      GPT output: {itineraryActivities}
      <br />
      <ActivityCard />
    </div>
  );
}
