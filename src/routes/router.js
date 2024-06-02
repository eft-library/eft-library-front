import Header from 'src/components/Header/Header';
import Footer from 'src/components/Footer/Footer';
import Map from 'src/app/routes/Map/Map';
import NotFound from 'src/app/routes/404/NotFound';
import Ballistics from 'src/app/routes/Ballistics/Ballistics';
import Boss from 'src/app/routes/Boss/Boss';
import Hideout from 'src/app/routes/Hideout/Hideout';
import Ammo from 'src/components/Item/Ammo/Ammo';
import Bag from 'src/components/Item/Bag/Bag';
import Container from 'src/components/Item/Container/Container';
import Headset from 'src/app/routes/Headset/Headset';
import HeadWear from 'src/app/routes/HeadWear/HeadWear';
import Medical from 'src/components/Item/Medical/Medical';
import Rig from 'src/components/Item/Rig/Rig';
import Vest from 'src/components/Item/Vest/Vest';
import Weapon from 'src/app/routes/Weapon/Weapon';
import Quest from 'src/app/routes/Quest/Quest';
import QuestDetail from 'src/app/routes/QuestDetail/QuestDetail';
import Key from 'src/components/Item/Key/Key';
import Main from 'src/app/routes/Main/Main';
import MapOfTarkov from 'src/app/routes/MapOfTarkov/MapOfTarkov';

const PageRouter = {
  HEADER: Header,
  FOOTER: Footer,
  MAP: Map,
  NOT_FOUND: NotFound,
  BALLISTICS: Ballistics,
  BOSS: Boss,
  HIDEOUT: Hideout,
  AMMO: Ammo,
  BAG: Bag,
  CONTAINER: Container,
  HEADSET: Headset,
  HEADWEAR: HeadWear,
  MEDICAL: Medical,
  RIG: Rig,
  KEY: Key,
  VEST: Vest,
  WEAPON: Weapon,
  QUEST: Quest,
  QUSET_DETAIL: QuestDetail,
  MAIN: Main,
  MAP_OF_TARKOV: MapOfTarkov,
};

export default PageRouter;
