const formaDate = (inputDateTimeString) => {
	// 将字符串解析为日期对象
	const inputDate = new Date(inputDateTimeString);

	// 提取所需的年、月、日、小时、分钟和秒
	const year = inputDate.getUTCFullYear();
	const month = String(inputDate.getUTCMonth() + 1).padStart(2, "0");
	const day = String(inputDate.getUTCDate()).padStart(2, "0");
	const hours = String(inputDate.getUTCHours()).padStart(2, "0");
	const minutes = String(inputDate.getUTCMinutes()).padStart(2, "0");
	const seconds = String(inputDate.getUTCSeconds()).padStart(2, "0");

	const formattedDateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

	return formattedDateTimeString
}
export default formaDate