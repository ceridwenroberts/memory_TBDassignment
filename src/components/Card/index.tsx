import Image from "next/image";
import cards from "@/data/cards.json"

type CardType = {
    id: number;
    name: string;
    imgSrc: string;
    reverse: string;
}

const Card = () => {

    return (
        <div>Card Component
            { cards.map((card: CardType) => (
                <div key={ card.id }>{ card.name }
                  <Image
      src={card.imgSrc}
      width={500}
      height={500}
      alt="card.name"
                    />
                    </div>
            ))}
        </div>
    )
}

export default Card