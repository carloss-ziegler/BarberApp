import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Back from "../../assets/back.svg";
import Previous from "../../assets/nav_prev.svg";
import Next from "../../assets/nav_next.svg";

const BarberModal = ({ data, service, setShow, show }) => {
  if (!service) {
    return null;
  }
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([]);

  useEffect(() => {
    let today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDate());
  }, []);

  useEffect(() => {
    if (data.available) {
      let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      let newListDays = [];

      for (let i = 1; i <= daysInMonth; i++) {
        let d = new Date(selectedYear, selectedMonth, i);
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;
        let selDate = year + "-" + month + "-" + day;

        let availability = data.available?.filter((e) => e.date === selDate);

        newListDays.push({
          status: availability?.length > 0 ? true : false,
          weekday: days[d.getDay()],
          number: i,
        });
      }

      setListDays(newListDays);
      setSelectedDay(1);
      setListHours([]);
      setSelectedHour(0);
    }
  }, [selectedMonth, selectedYear]);

  const handleCloseButton = () => {
    setShow(false);
  };

  const handleFinish = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setShow(false);
    setLoading(false);
  };

  const handlePreviousButton = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() - 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(1);
  };

  const handleNextButton = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() + 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(1);
  };

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  return (
    <Modal transparent={true} visible={show} animationType="slide">
      <View className="flex-1 bg-[#00000055] justify-end">
        <View className="bg-[#e5e5e5] rounded-tl-3xl rounded-tr-3xl min-h-[300px] p-5">
          <TouchableOpacity
            onPress={handleCloseButton}
            className="absolute top-3 left-5 items-center justify-center rounded-full bg-white opacity-80 -rotate-90"
          >
            <Back width="36" height="36" fill="#62d2c1" />
          </TouchableOpacity>

          <View className="bg-[#f5f5f5] mt-12 py-2 px-3 flex-row space-x-3 items-center rounded">
            <Image
              source={{ uri: data.avatar }}
              resizeMode="cover"
              className="w-14 h-14 rounded-xl bg-gray-400"
            />
            <Text className="text-gray-500 font-semibold text-lg">
              {data.name}
            </Text>
          </View>

          <View className="mt-5 bg-[#f5f5f5] py-2 px-3 flex-row items-center rounded justify-between">
            {data.services && (
              <Text className="text-base font-semibold">
                {data.services[service].name}
              </Text>
            )}
            {data.services && (
              <Text className="text-gray-400">
                R${data.services[service]?.price.toFixed(2)}
              </Text>
            )}
          </View>

          <View className="mt-5 bg-[#f5f5f5] rounded py-2 px-3">
            <View className="self-center space-x-3 flex-row items-center">
              <TouchableOpacity onPress={handlePreviousButton}>
                <Previous width="32" height="36" fill="#252525" />
              </TouchableOpacity>

              <Text>
                {months[selectedMonth]} {selectedYear}
              </Text>

              <TouchableOpacity onPress={handleNextButton}>
                <Next width="32" height="36" fill="#252525" />
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {listDays.map((item, index) => (
                <View
                  className="items-center w-12 justify-center py-2"
                  key={index}
                >
                  <Text className="text-base font-semibold">
                    {item.weekday}
                  </Text>
                  <Text className="text-base font-semibold">{item.number}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity
            className={`${
              loading ? "bg-gray-400" : "bg-[#268596]"
            } items-center justify-center w-full py-3 rounded mt-5`}
            onPress={handleFinish}
            disabled={loading}
          >
            <Text className="text-[#f5f5f5] text-lg font-semibold">
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <>
                  <Text>Finalizar</Text>
                </>
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BarberModal;
