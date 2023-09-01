import ChartLists from "@/components/CartsList/CartsLIsts";
import dynamic from "next/dynamic";

const Home = () => {
  return (
    <main>
      <ChartLists />
    </main>
  );
};

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
