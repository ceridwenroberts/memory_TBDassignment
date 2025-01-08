const Rules = () => {
  return (
    <>
      <div className="text-xs lg:text-base">
        <h4 className="underline-offset-2 font-medium">Rules</h4>
        <p data-testid="rules-text">
          Click a card to reveal an image. Then click another card to reveal
          that image. Your job is to remember the images and click two of the
          same cards. Good luck beating the highscore!
        </p>
        <p data-testid="good-luck">Good Luck!</p>
      </div>
    </>
  );
};
export default Rules;
