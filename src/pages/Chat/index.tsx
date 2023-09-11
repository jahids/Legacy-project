/* eslint-disable */
import { Box, Button, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { months } from "../../data/months";
import { getCyclistName, profile } from "../../services/authentication";
import { parts } from "../../data/partsData";
import { getAllSubpart } from "../../services/bikeDetails";
import { getTimeSlots, order } from "../../services/order";
import { getCaseNumber, passiveCase } from "../../services/cases";
import { useNavigate } from "react-router-dom";
import FileUpload from "./FileUpload";



const arr: any[] = [
    {
        type: "text", //step 1
        stepId : 'step1',
        data: [
            `Hi ${JSON.parse(localStorage.getItem("profile"))?.name}`,
            "Select which issues you are facing so that we can help",
        ],
        from: "bot",
    },
    // {
    //   type: 'option',//step 2
    //   data: [
    //     {
    //       selected: false,
    //       value: 'Bike damaged',
    //     },
    //     {
    //       selected: false,
    //       value: 'Part replacement',
    //     },
    //     {
    //       selected: false,
    //       value: 'Maintenance',
    //     },
    //     {
    //       selected: false,
    //       value: 'Other',
    //     },
    //   ],
    //   from: 'user',
    // },
    // {
    //   type: 'text', //step 3
    //   data: [
    //     'We are opening an Active case number 17',
    //     'Which part or parts need to be replaced or repaired',
    //   ],
    //   from: 'bot',
    // },
    {
        type: "option", //step 4
        stepId : 'step2',
        data: [
            {
                selected: false,
                value: "Wheel",
            },
            {
                selected: false,
                value: "Drive Mechanics",
            },
            {
                selected: false,
                value: "Frame",
            },
            {
                selected: false,
                value: "Brake",
            },
        ],
        from: "user",
    },
    {
        type: "text", //step 5
        stepId : 'step3',
        data: ["Which drive mechanics part do you need to replace or repaired"],
        from: "bot",
    },
    {
        type: "option", //step 6
        data: [],
        stepId : 'step4',
        from: "user",
    },
    {
        type: "text", //step 7
        stepId : 'step5',
        data: ["Let's book a time with support. Which day works for you?"],
        from: "bot",
    },
    {
        type: "option", //step 8
        stepId : 'step6',
        data: [
            {
                selected: false,
                value: "Sun",
            },
            {
                selected: false,
                value: "Mon",
            },
            {
                selected: false,
                value: "Tue",
            },
            {
                selected: false,
                value: "Wed",
            },
        ],
        from: "user",
    },
    {
        type: "text", // step 9
        stepId : 'step7',
        data: ["These slots are available on your selected day. Select one"],
        from: "bot",
    },
    {
        type: "option", //step 10
        stepId : 'step8',
        data: [
            {
                selected: false,
                value: "09:00",
            },
            {
                selected: false,
                value: "13:00",
            },
            {
                selected: false,
                value: "14:00",
            },
            {
                selected: false,
                value: "17:00",
            },
        ],
        from: "user",
    },
    {
        type: "text", //step 11
        stepId : 'step9',
        data: [
            "Great. You have a call booked for Wed, 23 Aug at 9:00",
            "Download the meeting link to have it in your calendar",
        ],
        from: "bot",
    },
    {
        type: "text", //step 12
        stepId : 'step10',
        data: ["Share a photo/video..."],
        from: "bot",
    },
    {
        type: "option", //step 13
        stepId : '',
        data: [
            {
                selected: false,
                value: "",
            },
            {
                selected: false,
                value: "",
            },
        ],
        from: "user",
    },
    undefined,
];

const Chat: React.FC = () => {
    const meetingLink = (
        <a
            href={"https://meet.google.com/tvy-dffh-aid"}
            style={{ textDecoration: "underline" }}
        >
            meeting link
        </a>
    );

    const daysOfTheWeek = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

    const navigate = useNavigate();
    const [cyclist, setCyclist] = useState<any>("");
    const [curindex, setCurindex] = useState<number>(0);
    const [messages, setMessages] = useState<any[]>([]);
    const [getSubpart, setGetSubpart] = useState<any[]>([]);
    const [getSlot, setGetSlot] = useState<any[]>([]);
    const [chatData, setChatData] = useState<any>(arr)


    const [__selected_date__,_setSelectedDate_] = useState();
    const [__selectedSlot__,_setSelectedSlot_] = useState();
    const [_subpartIdList_,_setSubPartIdList_] = useState();

    const [chatResource,setChatResource] = useState(null);


    const handleChatResource = (src)=>{
      setChatResource(src);
    };

    const [timeSlotsPerDay, setTimeSlotsPerDay] = useState<
        { day: string; slots: string[] }[]
    >([]);

    useEffect(() => {
        const getData = async () => {
            // const cyclistName = await getCyclistName();
            // if (cyclistName) {
            //     arr[0].data[0] = "Hi " + cyclistName.name;
            // }

            const cyclist = await profile(localStorage.getItem('accessToken'));
            if (cyclist) {
                setCyclist(cyclist);
            }

            const allSubparts = await getAllSubpart();
            if (allSubparts) {
                setGetSubpart(allSubparts);
            }

            // const caseNum = await getCaseNumber();
            // if (caseNum) {
            //     arr[2].data[0] = `We are opening an Active case number ${caseNum.caseNumber}`;
            // }
        };

        getData();
    }, []);

    const creatingCase = async () => {

      const chatid = JSON.parse(window.localStorage.getItem("chatid")) 
console.log("chat id db id", chatid?._id);
        const newCase = {
            type: "Active",
            tags: [],
            note: [{ text: "Active case", timeStamp: new Date() }],
            supportTime: {},
            orderId: chatid?._id,
            videoURL : chatResource.url
        };

        //console.log(`📙🏮📕`,messages);

        newCase.tags = messages[3].data.reduce(
            (accumulator: any[], subpart: any) => {
                if (subpart.selected) {
                    accumulator.push(subpart.value);
                }
                return accumulator;
            },
            []
        );

        const selectedDay = messages[5].data.filter((day: any) => day.selected);
        const selectedSlot = messages[7].data.filter((slot: any) => slot.selected);

        const selectedSupportTime = getSlot.reduce(
            (accumulator: any[], slot: any) => {
                if (
                    daysOfTheWeek[new Date(slot.date).getDay()] ===
                    selectedDay[0].value
                ) {
                    const supportTime = {
                        slotName: "B",
                        slotTime: "9:00-10:00",
                        timeStamp: new Date(slot.date),
                    };

                    const bookedSlot = slot.slots.filter((slot: any) => {
                        return (
                            slot.slotTime.split("-")[0] ===
                            selectedSlot[0].value
                        );
                    })[0];

                    supportTime.slotName = bookedSlot?.slotName;
                    supportTime.slotTime = bookedSlot?.slotTime;

                    accumulator.push(supportTime);
                }

                return accumulator;
            },
            []
        );

        newCase.supportTime = selectedSupportTime[0];

        const bicyclePartsIds = getSubpart.filter((v )=>  v.name );

        const Order = {
            bicycleParts: messages[3].data.reduce(
                (accumulator: any[], subpart: any) => {
                    if (subpart.selected) {
                        const part = getSubpart.filter((part) => {
                            return String(part.name) === String(subpart.value.split(' ').join(''));
                        });

                        accumulator.push(part[0]?._id);
                    }

                    return accumulator;
                },
                []
            ),
            deliveryAddress: "N/A",
            contactNumber: cyclist.phone,
            note: "",
            slot: "N/A",
            totalPrice: 0,
        };

        // console.log(newCase);

         const createdOrder = await order(Order);
// const chatid = JSON.parse(window.localStorage.getItem("chatid")) 
// console.log("chat id db id", chatid?._id);


        if (createdOrder) {
            // newCase.orderId = chatid?._id;
            console.log(newCase);
            const createdCase = await passiveCase(newCase);
            if (createdCase) {
                setTimeout(() => {
                    navigate("/cyclist-case");
                }, 3000);
            }
        }
    };

    const addNewMessage = () => {
        if (curindex + 1 >= arr.length) {
            // creatingCase();

            // alert("lets create a case now!");

            return;
        }

        console.log(`addNewMessag ---> curIdx , ${curindex} = ${arr[curindex].stepId}`,messages);

        if (curindex==2) { // select Main part area
            const category = messages[1].data.reduce(
                (accumulator: any[], data: any) => {
                    if (data.selected) {
                        accumulator.push(data.value.split(" ").join(""));
                    }

                    return accumulator;
                },
                []
            );

            //console.log('😍data',arr[curindex],'message :',messages);

            const subpartData: any[] = [];

            category.forEach((name: any) => {
                const subparts = parts.reduce((accumulator: any[], part) => {
                    if (part.category === name) {
                        accumulator.push({ selected: false, value: part.name });
                    }

                    return accumulator;
                }, []);
                subpartData.push(...subparts);

                arr[3].data = subpartData;
            });
        }

        if (curindex === 4) { // selected sub part area
          
            const subpart = messages[3].data.filter(
                (part: any) => part.selected
            );

            const subparts = subpart.reduce(
                (accumulator: any[], value: any) => {

                  
                  //getSubpart == subPartList
                    const part = getSubpart.filter(
                        (subpart) =>
                            String(subpart.name) === String(value.value.split(' ').join(""))
                    );
                    accumulator.push(part[0]._id);
                    return accumulator;
                },
                []
            );

            // _setSubParIdtList_(subparts);

            // console.log('🎅👼',subparts);

            (async function getData() {

                const _result = await getTimeSlots({ subparts: subparts });
                
                console.log('🔏🔏🔓🔓🔏🛢🧲☎☎🧰🧲☎☎🧰☎🧲🧲☎☎☎☎☎☎☎📞📞',_result);

                if (_result && _result.slots.length) {
                    setGetSlot(_result.slots);

                    const days = _result?.slots.map((slot: any) => {
                        return {
                            value: daysOfTheWeek[new Date(slot.date).getDay()],
                            selected: false,
                        };
                    });
                    arr[5].data = days;


                    const _slotList = _result.technician.workingSlots.map((v ) => ({ select : false, value : v.slotTime }));
                    arr[7].data = _slotList;

                    const technicianTimeSlotsPerDay = _result?.slots.map(
                        (timeSlot: any) => {

                          console.log('🎁🎁🧨🎉✨',timeSlot);
                            const parsedSlots = timeSlot.slots.map(
                                (time: any) => time.slotTime.split("-")[0]
                            );

                            return {
                                day:
                                    daysOfTheWeek[
                                        new Date(timeSlot.date).getDay()
                                    ],
                                slots: parsedSlots,
                            };
                        }
                    );

                    console.log(`💥💥💥💥💥💥💥💥`,technicianTimeSlotsPerDay);

                    // arr[7] slots 

                    setTimeSlotsPerDay(technicianTimeSlotsPerDay);
                }
            })();

        }

        if (curindex === 6) {

          
            const selectedDayIndex = messages[5].data.findIndex(
                (day: any) => day.selected
            );
            if (selectedDayIndex === -1) return;



            const newTimeSlots = timeSlotsPerDay.filter(
                (timeSlots) =>
                    timeSlots.day === messages[5].data[selectedDayIndex].value
            )[0];

            console.log('🎨🧶🧶🎗🎭🎨',newTimeSlots)

            // arr[8].data = newTimeSlots.slots.map((slot: string) => {
            //     return { value: slot, selected: false };
            // });


            //console.log(`😎😎😎`,arr[6])
        }

        if (curindex === 8) {
          //console.log(`🎗🎀🎀🎁🎁`,messages);

            const selectedDay = messages[5].data.filter(
                (day: any) => day.selected
            );

            const selectedSlot = messages[7].data.filter(
                (slot: any) => slot.selected
            );

            const idx = Math.floor(Math.random()*selectedSlot.length);
            console.log(`💥💥💥`,selectedSlot[idx]);
            const selectedSupportTime = getSlot.reduce(
                (accumulator: any[], slot: any) => {
                    if (
                        daysOfTheWeek[new Date(slot.date).getDay()] ===
                        selectedDay[0].value
                    ) {
                        const supportTime = {
                            slotName: "B",
                            slotTime: "9:00-10:00",
                            timeStamp: new Date(slot.date),
                        };

                        const bookedSlot = slot.slots.filter((slot: any) => {

                            return (
                                slot.slotTime.split("-")[0] ===
                                selectedSlot[0].value
                            );
                        })[0];


                        supportTime.slotName = bookedSlot?.slotName;
                        supportTime.slotTime = selectedSlot[idx].value;

                        accumulator.push(supportTime);
                    }

                    return accumulator;
                },
                []
            );
            

            //////

            


            //console.log(`🥶🥶🥶🥶🥶🥵🥶`,selectedSupportTime);

            _setSelectedSlot_(selectedSupportTime);


            arr[8].data[0] = `Great. You have a call booked for ${
                daysOfTheWeek[
                    new Date(selectedSupportTime[0].timeStamp).getDay()
                ]
            }, ${new Date(selectedSupportTime[0].timeStamp).getDate()} ${months[
                new Date(selectedSupportTime[0].timeStamp).getMonth()
            ].slice(0, 3)} at ${selectedSupportTime[0].slotTime}.`;
        }

        setMessages((prev) => [...prev, arr[curindex]]);

        setTimeout(() => {
            if (arr[curindex + 1] === undefined) {
                setCurindex(curindex + 1);
                return;
            }

            setMessages((prev) => [...prev, arr[curindex + 1]]);
            setCurindex(curindex + 2);
        }, 1000);
        // setCurindex(curindex+1);
    };

    const handleclick = (step: number, option: number) => {
        const updatedArr = [...messages];

        console.log(
            `✨🎆🎈🎁step = ${step}  option = ${option} , message =`,
            messages
        );
        console.log(`🤑😢😭`,arr);
        updatedArr[step].data[option].selected = !updatedArr[step].data[option]
            .selected;
        setMessages(updatedArr);
    };

    useEffect(() => {
        addNewMessage();
    }, []);

    const handleConfirm = ()=>{

      //console.log(`🤣😃😄`,curindex)
      if(curindex <10){
        addNewMessage();
      }
      else{

        //console.log(`🐲🐲🐲🐲🐲🐲🐲🐲🐲🐲🦄🐔🦄🦧🦧🐒🐒🐽🐽🐽🐽🐽`);
         creatingCase();
      }

    };

    return (
        <Box className="overflow-y-auto" fontWeight={"500"}>
            <Text
                m={"1rem auto"}
                textAlign={"center"}
            >{`${new Date().getDate()} ${
                months[new Date().getMonth()]
            }, ${new Date().getUTCFullYear()}`}</Text>

            {messages.map((item, index1) => (
                <Box
                    key={index1}
                    display={"flex"}
                    flexDir={item.from === "bot" ? "column" : "row"}
                    alignItems={"bot" ? "flex-end" : "flex-end"}
                >
                    {item.type === "text" ? (
                        item.data.map((chat: any, index2: number) => (
                            <Box
                                key={index2}
                                bg={
                                    item.from === "bot"
                                        ? "#EDCBEF"
                                        : "transparent"
                                }
                                color="#001F3F"
                                p={3}
                                m={item.from === "bot" ? 3 : 2}
                                w={item.from === "bot" ? "70%" : "100%"}
                                rounded="xl"
                                className={
                                    item.from === "bot" ? "text-[#001F3F]" : ""
                                }
                            >
                                {chat ===
                                "Download the meeting link to have it in your calendar" ? (
                                    <div>
                                        Download the {meetingLink} to have it in
                                        your calendar
                                    </div>
                                ) : (
                                    chat
                                )}
                            </Box>
                        ))
                    ) : (
                        <Box
                            key={index1}
                            bg={item.from === "bot" ? "#EDCBEF" : "transparent"}
                            color="#001F3F"
                            display={"flex"}
                            flexWrap={"wrap"}
                            m={item.from === "bot" ? 3 : 2}
                            w={item.from === "bot" ? "70%" : "100%"}
                            rounded="xl"
                            className={
                                item.from === "bot" ? "text-[#001F3F]" : ""
                            }
                        >
                            {item.data.map((option: any, index2: number) => (
                                <Box
                                    display={"inline-flex"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    key={index2}
                                    onClick={() => handleclick(index1, index2)}
                                    bg={
                                        option.selected
                                            ? "#C1FAA6"
                                            : "transparent"
                                    }
                                    color={
                                        option.selected ? "#001F3F" : "#C1FAA6"
                                    }
                                    rounded="xl"
                                    h={"4rem"}
                                    p={"0.5rem"}
                                    m={2}
                                    w="9rem"
                                    border="1px solid #C1FAA6"
                                    textAlign="center"
                                >
                                    {option.value}
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
            ))}

            <Center>
                {curindex == 10 ? <FileUpload updater = {setChatResource} />: null}
            </Center>
            <Center>
                {chatResource ? ( chatResource.type=='image' ? <img width='320px' style={{borderRadius:'8px'}} src={chatResource.url} /> : <video  width="320px" height="240" controls>
                <source src={chatResource.url} type="video/mp4" />
                </video> ) : null}
            </Center>
            <Center>
                <Button
                    onClick={handleConfirm}
                    bg="#C1FAA6"
                    color="#001F3F"
                    rounded="xl"
                    h="40px"
                    w="81.5%"
                    border="1px solid #C1FAA6"
                    textAlign="center"
                    mt={"3rem"}
                    mb={"6rem"}
                >
                    Confirm
                </Button>
            </Center>

            {/* <Box position={'fixed'} bottom={'-0.5rem'} bg={'#001F3F'} h={'5rem'} w={'100%'} pt={'1rem'}>
        <Input
          borderColor='#C1FAA6'
          borderRadius='xl'
          backgroundColor='#001F3F'
          width='18rem'
          padding='2'
          paddingLeft='3'
          type='text'
          ml={'1rem'}
          mr={'1rem'}
        />

        <IconButton
          isRound={true}
          variant='solid'
          colorScheme='teal'
          bg={'#C1FAA6'}
          aria-label='Done'
          fontSize='20px'
          icon={<CheckIcon />}
        />
      </Box> */}
        </Box>
    );
};

export default Chat;
