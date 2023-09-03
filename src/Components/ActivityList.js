import ActivityCard from "./ActivityCard";

export default function ActivityList({ itineraryActivities }) {
  return (
    <div>
      Activity List
      <br />
      GPT output: {JSON.stringify(itineraryActivities)}
      <br />
      <ActivityCard />
    </div>
  );
}
