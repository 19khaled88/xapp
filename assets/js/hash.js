function createHash(data1, data2, data3, data4,data5,data6,data7,data8) {
    // Concatenate data into a single string with a delimiter
    const combinedString = `${data1}|${data2}|${data3}|${data4}|${data5}|${data6}|${data7}|${data8}|`;
    
    // Encode to Base64
    const encodedString = btoa(combinedString);

    return encodedString;
}