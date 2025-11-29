// frontend/src/components/marketing/FeatureItem.tsx

interface TitleItemProps {
  title: string;
  text: string;
}

export default function FeatureItem({ title, text }: TitleItemProps) {
  return (
    <div className="flex gap-4 items-start">
      <div>
        <h3 className="text-2xl lg:text-4xl mb-3 lg:mb-4 font-semibold">{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}