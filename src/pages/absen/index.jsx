import React, { useRef, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Heading,
  Icon,
  Button,
  Select,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/Bi";
import { RiFileTextFill } from "react-icons/ri";
import { Times } from "@/components/Times";
import { NavLink } from "react-router-dom";
import Presensi from "@/assets/img/Presensi.png";
import useUserStore from "@/store/userStore";
import { attendanceIn } from "@/services";

const Absen = () => {
  const distance = useUserStore((state) => state.distance);
  const [keterangan, setKeterangan] = useState("");
  const fileInputRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        file: fileInputRef.current.files[0],
        keterangan: keterangan,
        status: "Tepat Waktu",
      };
      const response = await attendanceIn(data);
      console.log(response.data.message);
      alert("berhasil absen", response.data.message);
      console.log(data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <Box bgColor="secondary" fontFamily="mukta">
      <Box
        maxW="540px"
        minH="100vh"
        margin="auto"
        backgroundColor="background"
        position="relative"
      >
        <Flex margin="0px 24px" padding="42px 0px" alignItems="center">
          <NavLink to="/">
            <Icon as={BiArrowBack} />
          </NavLink>
          <Heading fontSize="lg" fontWeight="700" ml="28px">
            History Presensi
          </Heading>
        </Flex>
        <Times />
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Flex flexDir="column" className="content" m="0 24px" gap="24px">
              <Select
                placeholder="Keterangan"
                onChange={(e) => setKeterangan(e.target.value)}
              >
                <option value="Sakit">Sakit</option>
                <option value="Izin">Izin</option>
              </Select>
              <Flex
                bgColor="primary"
                className="hadir"
                justify="space-between"
                gap="24px"
                align="center"
                p="16px 24px"
                borderRadius="8px"
                w="100%"
              >
                <Input
                  w="100%"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  ref={fileInputRef}
                />
                <Flex className="img">
                  <Image src={Presensi} alt="" w="98px" h="90px" />
                </Flex>
                <Flex className="text" flexDir="column" gap="8px">
                  <Heading fontSize="md" color="white">
                    Ambil foto untuk mengisi presensi masuk
                  </Heading>
                  <Flex
                    className="absen"
                    align="center"
                    bgColor="white"
                    borderRadius="4px"
                    width="-webkit-fit-content"
                    p="4px 16px"
                    gap="8px"
                    color="primary"
                  >
                    <Icon data-feather="camera" />
                    <Heading fontSize="xs">Ambil sekarang</Heading>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex m="24px 24px">
              {distance <= 100 ? (
                <Button type="submit">Kirim</Button>
              ) : (
                <Button isDisabled>Kirim</Button>
              )}
            </Flex>
          </FormControl>
        </form>
        {/* <Flex
            className="card izin"
            bgColor="white"
            boxShadow="lg"
            gap="8px"
            justify="start"
            align="center"
            borderRadius="8px"
            w="100%"
          >
            <Flex
              className="vector"
              p="24px 2rem"
              bgColor="secondary"
              borderRadius="8px 0 0 8px"
            >
              <Icon as={RiFileTextFill} boxSize="20px" color="textDark" />
            </Flex>
            <Flex className="text" flexDir="column" justifySelf="start">
              <Heading fontSize="md" color="primary">
                Izin
              </Heading>
              <Text fontSize="xs">Lampirkan surat izin</Text>
            </Flex>
          </Flex>
          <Flex
            className="card sakit"
            bgColor="white"
            boxShadow="lg"
            gap="8px"
            justify="start"
            align="center"
            borderRadius="8px"
            w="100%"
          >
            <Flex
              className="vector"
              p="24px 2rem"
              bgColor="secondary"
              borderRadius="8px 0 0 8px"
            >
              <Icon as={RiFileTextFill} boxSize="20px" color="textDark" />
            </Flex>
            <Flex className="text" flexDir="column" justifySelf="start">
              <Heading fontSize="md" color="primary">
                Sakit
              </Heading>
              <Text fontSize="xs">Lampirkan surat keterangan dokter</Text>
            </Flex>
          </Flex> */}
      </Box>
    </Box>
  );
};

export default Absen;
