import Image from "next/image";
import { Text, IconAgency, IconBroker } from "../elements";

export default function ServiceStatement() {
  const styles =
    "bg-white drop-shadow-md flex flex-col justify-center items-center gap-6  max-w-[400px] p-6 rounded-3xl";
  return (
    // <Section padding="none" className="w-full justify-center items-center max-w-md ">
    <div>
      <div className="w-full relative">
        <div className="absolute z-50 p-6 left-0 right-0 bottom-0 top-0  flex flex-col justify-center items-center gap-6">
          <div className={styles}>
            <Text
              fontWeight="semibold"
              size="lead"
              className="text-center break-words"
            >
              Buying a Home Made Easier
            </Text>
            <IconAgency />
          </div>
          <div className={styles}>
            <Text
              fontWeight="semibold"
              size="lead"
              className="text-center break-words"
            >
              Smooth Real-Estate Aquisition Process
            </Text>
            <IconBroker />
          </div>
        </div>
        {/* <div className="object-contain bg-red-400 w-full h-[400px] "> */}
        <Image
          src={
            "https://cdn.sanity.io/images/82c04vam/real-estate-site-properties/2ba58b7be78bb6a5456c5927048d9c68244b0222-1920x1280.jpg"
          }
          width={1900}
          height={800}
          alt="service statement"
          className="object-cover blur-sm bg-red-400 w-full h-[600px] "
        />
        {/* </div> */}
      </div>
    </div>
    // </Section>
  );
}
