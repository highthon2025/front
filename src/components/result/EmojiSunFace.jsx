// EmojiSunFace.tsx
import React from 'react';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
  ClipPath,
  Rect,
} from 'react-native-svg';

const EmojiSunFace = () => (
  <Svg width="50" height="50" viewBox="0 0 41 41" fill="none">
    <Circle
      cx="20.0921"
      cy="19.7217"
      r="19.7217"
      fill="url(#paint0_linear)"
    />
    <Circle
      cx="8.09731"
      cy="32.3559"
      r="6.62556"
      transform="rotate(-14.789 8.09731 32.3559)"
      fill="url(#paint1_linear)"
    />
    <Circle
      cx="32.1708"
      cy="32.3559"
      r="6.62556"
      transform="rotate(-14.789 32.1708 32.3559)"
      fill="url(#paint2_linear)"
    />
    <Circle cx="12.5923" cy="16.6663" r="3.14807" fill="#452B2B" />
    <Circle cx="27.5919" cy="16.6663" r="3.14807" fill="#452B2B" />
    <G clipPath="url(#clip0)">
      <Path
        d="M14.6293 16.6663C13.0395 16.9133 12.8393 17.1134 12.5923 18.7032C12.3452 17.1134 12.1451 16.9133 10.5553 16.6663C12.1451 16.4192 12.3452 16.2191 12.5923 14.6293C12.8393 16.2191 13.0395 16.4192 14.6293 16.6663Z"
        fill="white"
      />
    </G>
    <Circle cx="11.4812" cy="15.37" r="0.18518" fill="white" />
    <Circle cx="26.2957" cy="15.37" r="0.18518" fill="white" />
    <Circle cx="13.9811" cy="18.0551" r="0.27777" fill="white" />
    <Circle cx="28.7956" cy="18.0551" r="0.27777" fill="white" />
    <G clipPath="url(#clip1)">
      <Path
        d="M29.6289 16.6663C28.0391 16.9133 27.839 17.1134 27.5919 18.7032C27.3449 17.1134 27.1447 16.9133 25.5549 16.6663C27.1447 16.4192 27.3449 16.2191 27.5919 14.6293C27.839 16.2191 28.0391 16.4192 29.6289 16.6663Z"
        fill="white"
      />
    </G>
    <Path
      d="M17.4856 24.2587C16.5218 24.2587 15.7098 25.0689 16.0787 25.9594C16.302 26.4987 16.6294 26.9886 17.0421 27.4013C17.4548 27.814 17.9447 28.1413 18.4839 28.3647C19.0231 28.588 19.6011 28.703 20.1847 28.703C20.7683 28.703 21.3463 28.588 21.8855 28.3647C22.4247 28.1413 22.9146 27.814 23.3273 27.4013C23.74 26.9886 24.0674 26.4987 24.2907 25.9594C24.6596 25.0689 23.8476 24.2587 22.8838 24.2587H20.1847H17.4856Z"
      fill="#FF6464"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear"
        x1="21.8396"
        y1="2.82927"
        x2="19.0103"
        y2="36.947"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFF7B8" />
        <Stop offset="0.25" stopColor="#FFEF7A" />
        <Stop offset="1" stopColor="#FFE252" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear"
        x1="8.68439"
        y1="26.6809"
        x2="7.73388"
        y2="38.1428"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFF7B8" />
        <Stop offset="0.25" stopColor="#FFEF7A" />
        <Stop offset="1" stopColor="#FFE252" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear"
        x1="32.7579"
        y1="26.6809"
        x2="31.8074"
        y2="38.1428"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFF7B8" />
        <Stop offset="0.25" stopColor="#FFEF7A" />
        <Stop offset="1" stopColor="#FFE252" />
      </LinearGradient>
      <ClipPath id="clip0">
        <Rect
          width="4.07397"
          height="4.07397"
          fill="white"
          transform="translate(10.5553 14.6293)"
        />
      </ClipPath>
      <ClipPath id="clip1">
        <Rect
          width="4.07397"
          height="4.07397"
          fill="white"
          transform="translate(25.5549 14.6293)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

export default EmojiSunFace;
