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
import Api from "../Api";
import { useNavigation } from "@react-navigation/native";

const BarberModal = ({ data, service, setShow, show }) => {
  if (!service) {
    return null;
  }
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([]);

  useEffect(() => {
    if (data.available && selectedDay > 0) {
      let d = new Date(selectedYear, selectedMonth, selectedDay);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      let selDate = year + "-" + month + "-" + day;

      let availability = data.available?.filter((e) => e.date === selDate);

      if (availability.length > 0) {
        setListHours(availability[0].hours);
      }
    }
    setSelectedHour(null);
  }, [data, selectedDay]);

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
      setSelectedDay(0);
      setListHours([]);
      setSelectedHour(0);
    }
  }, [data, selectedMonth, selectedYear]);

  const handleCloseButton = () => {
    setShow(false);
  };

  const handleFinish = async () => {
    setLoading(true);
    if (data.id && service != null && selectedDay && selectedHour) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      //   let res = await Api.setAppointment(
      //     userId,
      //     service,
      //     selectedYear,
      //     selectedMonth,
      //     selectedDay,
      //     selectedHour
      //   );
      //   if (res.error == "") {
      setShow(false);
      navigation.navigate("Appointments", {
        service: service,
        selectedYear: selectedYear,
        selectedMonth: selectedMonth,
        selectedDay: selectedDay,
        selectedHour: selectedHour,
        data: data,
      });
      //   } else {
      //     alert(res.error);
      //   }
    } else {
      alert("Preencha todos os campos!");
    }
    setLoading(false);
  };

  const handlePreviousButton = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() - 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(0);
  };

  const handleNextButton = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() + 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(0);
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
            <Back width="36" height="36" fill="#268596" />
          </TouchableOpacity>

          <View className="bg-[#f5f5f5] mt-12 py-2 px-3 flex-row space-x-3 items-center rounded shadow-sm">
            <Image
              source={{ uri: data.avatar }}
              resizeMode="cover"
              className="w-14 h-14 rounded-xl bg-gray-400"
            />
            <Text className="text-gray-500 font-semibold text-lg">
              {data.name}
            </Text>
          </View>

          <View className="mt-5 bg-[#f5f5f5] py-2 px-3 flex-row items-center rounded justify-between shadow-sm">
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

          <View className="mt-5 bg-[#f5f5f5] shadow-sm rounded py-2 px-3">
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
                <TouchableOpacity
                  onPress={() =>
                    item.status ? setSelectedDay(item.number) : null
                  }
                  className={`items-center rounded w-12 justify-center py-2 ${
                    item.status ? "opacity-100" : "opacity-30"
                  } ${
                    selectedDay === item.number && item.status && "bg-[#268596]"
                  }`}
                  key={index}
                  disabled={!item.status}
                >
                  <Text
                    className={`text-base font-semibold ${
                      item.number === selectedDay && item.status
                        ? "text-[#f5f5f5]"
                        : "text-[#252525]"
                    }`}
                  >
                    {item.weekday}
                  </Text>
                  <Text
                    className={`text-base font-semibold ${
                      item.number === selectedDay && item.status
                        ? "text-[#f5f5f5]"
                        : "text-[#252525]"
                    }`}
                  >
                    {item.number}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {selectedDay > 0 && listHours.length > 0 && (
            <View className="bg-[#f5f5f5] py-2 px-3 rounded items-center justify-center mt-3 shadow-sm">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {listHours.map((item, index) => (
                  <TouchableOpacity
                    className={`h-10 px-2 items-center justify-center rounded ${
                      item === selectedHour && "bg-[#268596]"
                    }`}
                    key={index}
                    onPress={() => setSelectedHour(item)}
                  >
                    <Text
                      className={`text-base font-semibold ${
                        item === selectedHour && "text-[#f5f5f5]"
                      }`}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <TouchableOpacity
            className={`${
              loading ? "bg-gray-400" : "bg-[#268596]"
            } items-center justify-center w-full py-3 rounded mt-5`}
            onPress={handleFinish}
            disabled={loading}
          >
            {loading ? (
              <Text className="text-[#f5f5f5] text-lg font-semibold">
                Aguarde <ActivityIndicator color="#ffffff" />
              </Text>
            ) : (
              <>
                <Text className="text-[#f5f5f5] text-lg font-semibold">
                  Finalizar
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BarberModal;
