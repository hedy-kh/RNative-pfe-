import React from "react";
import { Text } from "react-native";

const TimeAgo = ({ publishDate }) => {
  const getTimeDifference = () => {
    const currentTime = new Date();
    const publishTime = new Date(publishDate);
    const diffInMilliseconds = currentTime - publishTime;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 1) {
      if (diffInMinutes < 1) {
        return { text: `${diffInSeconds} seconds ago`, color: "green" };
      } else {
        return { text: `${diffInMinutes} minutes ago`, color: "green" };
      }
    } else if (diffInHours < 4) {
      return { text: `${diffInHours} hours ago`, color: "green" };
    } else if (diffInHours < 8) {
      return { text: `${diffInHours} hours ago`, color: "orange" };
    } else {
      return { text: `${diffInHours} hours ago`, color: "red" };
    }
  };

  const { text, color } = getTimeDifference();

  return <Text style={{ fontSize: 12, marginTop: 5, color }}>{text}</Text>;
};

export default TimeAgo;
