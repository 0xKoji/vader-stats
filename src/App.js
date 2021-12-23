import CirculatingSupply from "./components/CirculatingSupply";
import MarketCap from "./components/MarketCap";
import Price from "./components/Price";
import VaderHolders from "./components/VaderHolders";
import VaderStaked from "./components/VaderStaked";
import VethBurn from "./components/VethBurn";
import VethHolders from "./components/VethHolders";
import XVaderHolders from "./components/XVaderHolders";

function App() {
  return (
    <div>
      <div className="container mx-auto mt-10">

        <div className="grid m-3 md:m-0 grid-rows-1 md:grid-cols-3 gap-6">
          <Price />
          <CirculatingSupply />
          <MarketCap />
        </div>

        <div className="grid m-3 md:m-0 grid-rows-1 md:grid-cols-3 gap-6">
          <VaderHolders />
          <XVaderHolders />
          <VaderStaked />
        </div>

        <div className="grid m-3 md:m-0 grid-rows-1">
          <VethBurn />
        </div>

        <VethHolders />

      </div>
    </div>
  );
}

export default App;
