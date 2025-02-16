import hiddenCard from "./b.svg";

// Ace
import ac from "./ac.svg";
import ad from "./ad.svg";
import ah from "./ah.svg";
import as from "./as.svg";

// 2
import _2c from "./2c.svg";
import _2d from "./2d.svg";
import _2h from "./2h.svg";
import _2s from "./2s.svg";

// 3
import _3c from "./3c.svg";
import _3d from "./3d.svg";
import _3h from "./3h.svg";
import _3s from "./3s.svg";

// 4
import _4c from "./4c.svg";
import _4d from "./4d.svg";
import _4h from "./4h.svg";
import _4s from "./4s.svg";

// 5
import _5c from "./5c.svg";
import _5d from "./5d.svg";
import _5h from "./5h.svg";
import _5s from "./5s.svg";

// 6
import _6c from "./6c.svg";
import _6d from "./6d.svg";
import _6h from "./6h.svg";
import _6s from "./6s.svg";

// 7
import _7c from "./7c.svg";
import _7d from "./7d.svg";
import _7h from "./7h.svg";
import _7s from "./7s.svg";

// 8
import _8c from "./8c.svg";
import _8d from "./8d.svg";
import _8h from "./8h.svg";
import _8s from "./8s.svg";

// 9
import _9c from "./9c.svg";
import _9d from "./9d.svg";
import _9h from "./9h.svg";
import _9s from "./9s.svg";

// 10
import _10c from "./10c.svg";
import _10d from "./10d.svg";
import _10h from "./10h.svg";
import _10s from "./10s.svg";

// Jack
import jc from "./jc.svg";
import jd from "./jd.svg";
import jh from "./jh.svg";
import js from "./js.svg";

// Queen
import qc from "./qc.svg";
import qd from "./qd.svg";
import qh from "./qh.svg";
import qs from "./qs.svg";

// King
import kc from "./kc.svg";
import kd from "./kd.svg";
import kh from "./kh.svg";
import ks from "./ks.svg";
import { CardOrderType, CardSuitType } from "shared-resources";

const cardSvgMap: Record<string, string> = {
  hiddenCard,
  ac,
  ad,
  ah,
  as,
  "2c": _2c,
  "2d": _2d,
  "2h": _2h,
  "2s": _2s,
  "3c": _3c,
  "3d": _3d,
  "3h": _3h,
  "3s": _3s,
  "4c": _4c,
  "4d": _4d,
  "4h": _4h,
  "4s": _4s,
  "5c": _5c,
  "5d": _5d,
  "5h": _5h,
  "5s": _5s,
  "6c": _6c,
  "6d": _6d,
  "6h": _6h,
  "6s": _6s,
  "7c": _7c,
  "7d": _7d,
  "7h": _7h,
  "7s": _7s,
  "8c": _8c,
  "8d": _8d,
  "8h": _8h,
  "8s": _8s,
  "9c": _9c,
  "9d": _9d,
  "9h": _9h,
  "9s": _9s,
  "10c": _10c,
  "10d": _10d,
  "10h": _10h,
  "10s": _10s,
  jc,
  jd,
  jh,
  js,
  qc,
  qd,
  qh,
  qs,
  kc,
  kd,
  kh,
  ks,
};

export const fetchCardSvg = (order: CardOrderType, suit: CardSuitType) =>
  cardSvgMap[
    `${(order as string).toLowerCase()}${(suit as string).toLowerCase()}`
  ];
