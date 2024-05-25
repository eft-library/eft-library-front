import Header from 'src/components/Header/Header';
import Footer from 'src/components/Footer/Footer';
import Map from 'src/components/Map/Map';
import NotFound from 'src/components/404/NotFound';
import Ballistics from 'src/components/Ballistics/Ballistics';
import Boss from 'src/components/Boss/Boss';
import Hideout from 'src/components/Hideout/Hideout';
import Ammo from 'src/components/Item/Ammo/Ammo';
import Bag from 'src/components/Item/Bag/Bag';
import Container from 'src/components/Item/Container/Container';
import Headset from 'src/components/Item/Headset/Headset';
import HeadWear from 'src/components/Item/HeadWear/HeadWear';
import Medical from 'src/components/Item/Medical/Medical';
import Rig from 'src/components/Item/Rig/Rig';
import Vest from 'src/components/Item/Vest/Vest';
import Weapon from 'src/components/Weapon/Weapon';
import Quest from 'src/components/Quest/Quest';
import QuestDetail from 'src/components/QuestDetail/QuestDetail';
import Key from 'src/components/Item/Key/Key';
import Main from 'src/components/Main/Main';
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
