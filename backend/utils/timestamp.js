function parseDate(val) {
    return val < 10 ? "0" + val : String(val);
  }
  
  export const getTimestamp = () => {
// Get the current timestamp
var timestamp = new Date();

// Format the timestamp
var formattedTimestamp = timestamp.getFullYear().toString() +
    ("0" + (timestamp.getMonth() + 1)).slice(-2) +
    ("0" + timestamp.getDate()).slice(-2) +
    ("0" + timestamp.getHours()).slice(-2) +
    ("0" + timestamp.getMinutes()).slice(-2) +
    ("0" + timestamp.getSeconds()).slice(-2);

// Print the formatted timestamp
console.log(formattedTimestamp);

  
    return `${formattedTimestamp}`;
  };
  