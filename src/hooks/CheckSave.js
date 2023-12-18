import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (data) => {
  try {
    // Get existing data from AsyncStorage
    const existingData = await AsyncStorage.getItem("idforsave");
    const parsedData = existingData ? JSON.parse(existingData) : [];

    // Add the new data to the array
    parsedData.unshift(data);
    // console.log(JSON.stringify(parsedData));
    // Save the updated array back to AsyncStorage
    await AsyncStorage.setItem("idforsave", JSON.stringify(parsedData));
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const removeData = async (selected) => {
  const storedData = await AsyncStorage.getItem("idforsave");
  if (storedData) {
    // Parse the stored data as JSON
    const dataArray = JSON.parse(storedData);

    // Filter out the object with the target "id"
    const filteredDataArray = dataArray.filter((item) => item.id !== selected);

    // Update AsyncStorage with the filtered data
    await AsyncStorage.setItem("idforsave", JSON.stringify(filteredDataArray));
    console.log("Updated removeed :--- ", filteredDataArray);
  } else {
    // No data found in AsyncStorage
    console.log("No data found in AsyncStorage.");
  }
};
