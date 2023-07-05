import {
  RiAlarmFill,
  RiCamera2Fill,
  RiHistoryFill,
  RiListUnordered,
  RiUser3Fill,
} from "react-icons/ri";
import React, { useEffect, useRef, useState } from "react";
import { Box, Icon, Text, Flex, Image, Input } from "@chakra-ui/react";
import "@/assets/style.css";
import { NavLink, useLocation } from "react-router-dom";
import { attendanceIn, attendanceOut } from "@/services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserStore from "@/store/userStore";

export const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const user = useUserStore((state) => state.distance);
  const fileInputRef = useRef();
  const isActive = (path) => {
    const location = useLocation();
    return location.pathname === path;
  };

  const handleAttendance = async (e) => {
    e.preventDefault();
    try {
      const data = {
        file: fileInputRef.current.files[0],
      };
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
      // if (new Date().getHours() <= 9) {
      //   const response = await attendanceIn(data);
      //   toast.success(response.data.message, {
      //     position: "top-center",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   });
      // } else if (new Date().getHours() >= 16 && new Date().getHours() <= 21) {
      //   const response = await attendanceOut(data);
      //   toast.success(response.data.message, {
      //     position: "top-center",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   });
      // }
      console.log(data);
    } catch (error) {
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

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      <ToastContainer />
      <Flex
        className="nav"
        display="flex"
        justify="space-around"
        backgroundColor="background"
        fontWeight="700"
        fontSize="sm"
        fontFamily="mukta"
        color="secondary"
        position="fixed"
        width="540px"
        bottom="0"
        textAlign="center"
        boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        p="12px"
      >
        <Box>
          <NavLink
            exact
            to="/"
            padding="0.5rem 0"
            className={isActive("/") ? "active" : ""}
            style={{ fontWeight: "bold" }}
          >
            <Icon as={RiAlarmFill} boxSize="20px" lineHeight="0" />
            <Text>Presensi</Text>
          </NavLink>
        </Box>
        <Box marginRight="100px">
          <NavLink
            to="/history"
            textDecoration="none"
            padding="0.5rem 0"
            className={isActive("/history") ? "active" : ""}
          >
            <Icon as={RiHistoryFill} boxSize="20px" lineHeight="0" />
            <Text>History</Text>
          </NavLink>
        </Box>
        <Box
          backgroundColor="primary"
          width="100px"
          height="75px"
          top="-15px"
          rounded="lg"
          pos="absolute"
        >
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            onClick={() => fileInputRef.current.click()}
          >
            <Icon
              as={RiCamera2Fill}
              boxSize="20px"
              lineHeight="0"
              cursor="pointer"
            />
            <Text>Presensi</Text>
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
              onChange={handleAttendance}
            />
          </Flex>
        </Box>
        <Box>
          <NavLink
            to="/rekap"
            textDecoration="none"
            padding="0.5rem 0"
            className={isActive("/rekap") ? "active" : ""}
          >
            <Icon as={RiListUnordered} boxSize="20px" lineHeight="0" />
            <Text>Rekap</Text>
          </NavLink>
        </Box>
        <Box>
          <NavLink
            to="/profile"
            textDecoration="none"
            className={isActive("/profile") ? "active" : ""}
            padding="0.5rem 0"
          >
            <Icon as={RiUser3Fill} boxSize="20px" lineHeight="0" />
            <Text>Profile</Text>
          </NavLink>
        </Box>
      </Flex>
    </>
  );
};
