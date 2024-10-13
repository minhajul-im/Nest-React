export const Title = ({ children }: { children: string }) => {
  return (
    <h1 className="text-3xl font-extrabold text-center text-foreground py-6">
      {children}
    </h1>
  );
};
