import Img_apple_watch_44mm_space_grey from "../../images/frames/apple_watch_44mm_space_grey.png"
import Img_ipad_pro_landscape from "../../images/frames/ipad_pro_landscape.png"
import Img_ipad_pro_portrait from "../../images/frames/ipad_pro_portrait.png"
import Img_iphone_8_gold from "../../images/frames/iphone_8_gold.png"
import Img_iphone_8_silver from "../../images/frames/iphone_8_silver.png"
import Img_iphone_8 from "../../images/frames/iphone_8.png"
import Img_iphone_x_silver from "../../images/frames/iphone_x_silver.png"
import Img_iphone_x from "../../images/frames/iphone_x.png"
import Img_macbook_pro_silver from "../../images/frames/macbook_pro_silver.png"
import Img_macbook_pro from "../../images/frames/macbook_pro.png"

export const devices = {
  apple_watch_44mm_space_grey: {
    url: Img_apple_watch_44mm_space_grey,
    width: 300,
    height: 200,
    screenTopLeft: 0.2,
    screenTopRight: 0.8,
  },
  ipad_pro_landscape: {
    url: Img_ipad_pro_landscape,
    width: 300,
    height: 200,
    screenTopLeft: 0.2,
    screenTopRight: 0.8,
  },
  ipad_pro_portrait: {
    url: Img_ipad_pro_portrait,
    width: 300,
    height: 200,
    screenTopLeft: 0.2,
    screenTopRight: 0.8,
  },
  iphone_8_gold: {
    url: Img_iphone_8_gold,
    width: 300,
    height: 200,
    screenTopLeft: 0.2,
    screenTopRight: 0.8,
  },
  iphone_8_silver: {
    url: Img_iphone_8_silver,
    width: 300,
    height: 200,
    screenTopLeft: 0.2,
    screenTopRight: 0.8,
  },
  iphone_8: {
    url: Img_iphone_8,
    width: 300,
    height: 200,
    screenTopLeft: 0.2,
    screenTopRight: 0.8,
  },
  iphone_x_silver: {
    url: Img_iphone_x_silver,
    width: 300,
    height: 200,
    screenTopLeft: 0.2,
    screenTopRight: 0.8,
  },
  iphone_x: {
    url: Img_iphone_x,
    width: 300,
    height: 200,
    screenTopLeft: 0.2,
    screenTopRight: 0.8,
  },
  macbook_pro_silver: {
    url: Img_macbook_pro_silver,
    width: 300,
    height: 200,
    screenTopLeft: 0.2,
    screenTopRight: 0.8,
  },
  macbook_pro: {
    url: Img_macbook_pro,
    width: 300,
    height: 200,
    screenTopLeft: 0.2,
    screenTopRight: 0.8,
  },
}

export const getFrame = name => devices[name]
