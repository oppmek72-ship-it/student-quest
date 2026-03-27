import PixelAvatar from "./avatar/PixelAvatar";

export default function AvatarDisplay({ student, size = 48, animate = false }) {
  return (
    <PixelAvatar
      avatar={student.avatar}
      size={size}
      animate={animate}
      style={{ flexShrink: 0 }}
    />
  );
}
