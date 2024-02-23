
type FallbackProps = {
  errorMessage?: string;
};

export default function Fallback(props: FallbackProps) {
  const { errorMessage } = props;

  return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
          height: '100vh',
          textAlign: 'center',
        }}
      >
        {errorMessage ? (
          <>
            <h2>Following error has occured:</h2>
            <h1>{errorMessage}</h1>
          </>
        ) : (
          <h1>Something went wrong...</h1>
        )}
      </div>
  );
}
