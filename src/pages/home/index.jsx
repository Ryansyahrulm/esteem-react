import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Box,
  Flex,
  Image,
  Text,
  VStack,
  Icon,
  Skeleton,
  Input,
} from "@chakra-ui/react";
import { IoMdLogIn, IoMdLogOut, IoIosRemove } from "react-icons/Io";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Times } from "@/components/Times";
import { Link } from "react-router-dom";
import { getAttendance, getUser } from "@/services";

import { formatDate } from "@/utils/formatDate";
import useUserStore from "@/store/userStore";
import { formatTime } from "@/utils/formatTime";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { attendanceIn } from "@/services";

const Home = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const [historyAttendence, setHistory] = useState([]);
  const [currentTime, setCurrentTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef();
  const fileInputSakit = useRef();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getUser();
        const response2 = await getAttendance();
        setUser(response.data.data[0]);
        setHistory(response2.data.data);
        setIsLoading(false);
      } catch (error) {
        // Handle error if necessary
        setIsLoading(false);
        console.error(error);
      }
    };
    fetchData();
  }, [getUser]);
  const handleAttendanceIzin = async (e) => {
    e.preventDefault();
    try {
      const data = {
        file: fileInputRef.current.files[0],
        keterangan: "izin",
      };
      console.log(data);
      const response = await attendanceIn(data);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleAttendanceSakit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        file: fileInputSakit.current.files[0],
        keterangan: "sakit",
      };
      console.log(data);
      const response = await attendanceIn(data);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <>
      <ToastContainer />
      <Box bgColor="secondary" fontFamily="mukta" overflow="hidden">
        <Box
          maxW="540px"
          minH="100vh"
          margin="auto"
          backgroundColor="background"
          position="relative"
        >
          <Header />
          <Box>
            <Flex
              margin="0px 24px"
              mt="-2.5rem"
              padding="1rem 0px"
              backgroundColor="background"
              borderRadius="0.5rem"
              justify="flex-start"
              alignItems="center"
              alignContent="center"
              display="flex"
              boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
            >
              <Flex display="inline" margin="0px 24px">
                {user ? (
                  <Image src={user.foto} maxW="100px" alt="" />
                ) : (
                  <Skeleton w="100px" h="100px" />
                )}
              </Flex>
              <Flex display="grid">
                <Text margin="0" fontSize="md" fontWeight="700">
                  {user ? (
                    user.nama
                  ) : (
                    <Skeleton w="120px" h="20px" borderRadius="0.25rem" />
                  )}
                </Text>
                <Text margin="0" fontSize="sm" color="textDark">
                  {user ? (
                    `${user.tingkat} ${user.jurusan}`
                  ) : (
                    <Skeleton
                      w="50px"
                      mt="2px"
                      h="16px"
                      borderRadius="0.25rem"
                    />
                  )}
                </Text>
              </Flex>
            </Flex>
            <Times />
            <Flex
              margin="0px 64px"
              backgroundColor="background"
              justify="space-around"
              display="flex"
            >
              <VStack>
                <Flex
                  p="22px"
                  bgColor="#BF080A"
                  borderRadius="8px"
                  color="white"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Icon as={IoMdLogIn} boxSize="44px" />
                </Flex>
                <Text fontSize="md" textAlign={"center"}>
                  Izin
                </Text>
                <Input
                  w="100%"
                  height="100%"
                  opacity="0"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  ref={fileInputRef}
                  pos="absolute"
                  top="0"
                  left="0"
                  zIndex="-1"
                  onChange={handleAttendanceIzin}
                />
              </VStack>
              <VStack>
                <Flex
                  p="23px"
                  bgColor="#BF080A"
                  borderRadius="8px"
                  color="white"
                  onClick={() => fileInputSakit.current.click()}
                >
                  <Icon as={IoMdLogOut} boxSize="44px" />
                </Flex>
                <Text fontSize="md" textAlign={"center"}>
                  Sakit
                </Text>
                <Input
                  w="100%"
                  height="100%"
                  opacity="0"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  ref={fileInputSakit}
                  pos="absolute"
                  top="0"
                  left="0"
                  zIndex="-1"
                  onChange={handleAttendanceSakit}
                />
              </VStack>
            </Flex>
            <Box
              padding="0px 24px"
              mt="38px"
              pb="2rem"
              backgroundColor="background"
            >
              <Flex justify="space-between" display="flex" mb="24px">
                <Text fontSize="lg" fontWeight="700">
                  Histori Presensi
                </Text>
                <Link
                  to="/history"
                  color="primary"
                  fontWeight="700"
                  fontSize="lg"
                >
                  Lihat semua
                </Link>
              </Flex>
              {isLoading ? (
                <Skeleton height="115px" borderRadius="20px" />
              ) : historyAttendence.length === 0 ? (
                <Text>Belum Ada Data Absen</Text>
              ) : (
                historyAttendence.map((ul) => (
                  <Box
                    key={ul.id}
                    borderRadius="20px"
                    mb="2rem"
                    display="grid"
                    height="115px"
                    borderLeft="24px solid #BF080A"
                    backgroundColor="background"
                    boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    justify="space-between"
                  >
                    <Flex margin="0px 24px" mb="0" padding="0" align="end">
                      <Text fontSize="md" color="textDark">
                        {formatDate(ul.tanggal_masuk)}
                      </Text>
                    </Flex>
                    <Flex
                      backgroundColor="background"
                      padding="0"
                      margin="0px 24px"
                      justify="space-between"
                      display="flex"
                    >
                      <Box align="start">
                        <Text
                          color="primary"
                          margin="0"
                          fontSize="md"
                          fontWeight="700"
                        >
                          Waktu Masuk
                        </Text>
                        <Text
                          color="black"
                          margin="0"
                          fontSize="md"
                          fontWeight="700"
                        >
                          {formatTime(ul.jam_masuk)}
                        </Text>
                        <Text fontSize="md" color="textDark">
                          {ul.status}
                        </Text>
                      </Box>
                      <Flex align="center">
                        <Icon
                          as={IoIosRemove}
                          color="primary"
                          margin="0"
                          fontSize="md"
                          alignSelf="center"
                          fontWeight="700"
                        />
                      </Flex>
                      <Box>
                        <Text
                          color="primary"
                          margin="0"
                          fontSize="md"
                          fontWeight="700"
                        >
                          Waktu Pulang
                        </Text>
                        <Text
                          color="black"
                          margin="0"
                          fontSize="md"
                          fontWeight="700"
                        >
                          {ul.jam_pulang !== null ? (
                            ul.jam_pulang
                          ) : (
                            <Icon
                              as={IoIosRemove}
                              color="primary"
                              margin="0"
                              fontSize="md"
                              alignSelf="center"
                              fontWeight="700"
                            />
                          )}
                        </Text>
                        <Text fontSize="md" color="textDark">
                          {ul.jam_pulang == null
                            ? "Belum Absen Pulang"
                            : "Sudah absen pulang"}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                ))
              )}
            </Box>
          </Box>
          <Navbar />
        </Box>
      </Box>
    </>
  );
};

export default Home;
