import { HStack, VStack, Text, Image, Button } from "@chakra-ui/react";
import TextField from "components/TextField";
import { ITourCart } from "interfaces/cart";
import { IDiscountItem } from "interfaces/checkout";
import { useState, useEffect } from "react";
import { FaBus, FaHotel } from "react-icons/fa";
import { IoTimerOutline } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { formatCurrency } from "utils/common";

interface IOderItem {
  tour: ITourCart
  discountitem?: IDiscountItem[]
  currentCurrency: string
}

const OrderItem = (props: IOderItem) => {
  const { tour, discountitem, currentCurrency } = props
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (tour?.participants?.length === 0) {
      setTotalPrice(0)
      return
    }
    let totalPrice: number = 0

    tour?.participants.forEach((guest) => {
      totalPrice += guest?.price * guest?.quantity;
    });
    setTotalPrice(totalPrice);
  }, [tour?.participants]);

  return (
    <HStack
      width="full"
      align="self-start"
      border="2px solid #ccc"
      boxShadow="lg"
      background="#fff"
      padding="32px"
      borderRadius="8px"
      spacing={10}
    >
      <Image
        width="200px"
        borderRadius="8px"
        src={`${tour?.tour?.thumbnail}`}
        alt="img"
      />
      <VStack align="flex-start">
        <Text fontSize="xl" fontWeight="bold">
          {`${tour?.tour?.title}${tour?.isPrivate ? ' (Private)' : ''}`}
        </Text>
        <HStack>
          <Text color="#396973" fontSize="2xl" fontWeight="500">
            {discountitem && discountitem?.length !== 0
              ? formatCurrency(discountitem[0]?.tour?.totalPrice -
                discountitem[0]?.tour?.discountPrice, currentCurrency)
              : formatCurrency(totalPrice, currentCurrency)}
          </Text>
          <Text
            textAlign="inherit"
            fontSize="md"
            fontWeight="500"
            textDecoration="line-through"
            opacity="0.55"
          >
            {discountitem && discountitem?.length !== 0
              ? formatCurrency(discountitem[0]?.tour?.totalPrice, currentCurrency)
              : ""}
          </Text>
        </HStack>
        <HStack width='full' justifyContent='space-between'>
          <HStack>
            <IoTimerOutline />
            <Text fontSize="md" fontWeight="bold">
              {`${tour?.startDate.slice(0, 10)}`}
            </Text>
          </HStack>
          {tour?.isPrivate &&
            <HStack>
              <FaHotel />
              <Text fontSize="md" fontWeight="bold" >
                {tour?.hotels[0]?.name}
              </Text>
            </HStack>
          }
        </HStack>
        <HStack width='full' justifyContent='space-between'>
          <HStack>
            <MdPeopleAlt />
            {tour?.participants.map((participant) => (
              <Text fontSize="md" fontWeight="bold" key={participant?.title}>
                {participant?.quantity} {participant?.title}
              </Text>
            ))}
          </HStack>
          {tour?.isPrivate &&
            <HStack>
              <FaBus />
              <Text fontSize="md" fontWeight="bold" >
                {tour?.transports[0]?.name}
              </Text>
            </HStack>
          }
        </HStack>
      </VStack>
    </HStack>
  )
}

export default OrderItem
