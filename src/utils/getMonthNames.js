import createDate from "./createDate";

const getMonthesNames = (locale = "default") => {
  // const monthesNames: {
  //   month: ReturnType<typeof createDate>["month"],
  //   monthShort: ReturnType<typeof createDate>["monthShort"],
  //   monthIndex: ReturnType<typeof createDate>["monthIndex"],
  //   date: ReturnType<typeof createDate>["date"],
  //   }[] = Array.from({ length: 12 });

  const monthesNames = Array.from({ length: 12 });

  const d = new Date();

  monthesNames.forEach((_, index) => {
    const { month, monthIndex, monthShort, date } = createDate({
      locale,
      date: new Date(d.getFullYear(), d.getMonth() + index, d.getDate()),
    });

    monthesNames[monthIndex] = { month, monthIndex, monthShort, date };
  });
};

export default getMonthesNames;
