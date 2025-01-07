export interface RigClient {
  rig_data: RigData;
  isClass: boolean;
}

interface RigData {
  class_rig: DefenseData[];
  no_class_rig: DefenseData[];
}

interface DefenseData {
  id: string;
  durability: number;
  capacity: number;
  class_value: number;
  areas_kr: string[];
  weight: number;
  name: string;
  image: string;
}
