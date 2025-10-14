function Button({ styles, onClickHandler, children }: {styles: string, onClickHandler: () => void, children: React.ReactNode}) {
   return (
      <button className={styles}
      onClick={onClickHandler}>
         {children}
      </button>
   );
}

export default Button;