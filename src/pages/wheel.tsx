import { NextPage } from 'next/types';
import Head from 'next/head';
import { WheelPlate } from '../components/WheelPlate/WheelPlate';

const Wheel: NextPage = () => {
  return (
    <>
      <Head>
        <title>랜덤 발표자 - 발표자 뽑기</title>
      </Head>
      <section>
        <WheelPlate />
      </section>
    </>
  );
};

export default Wheel;
