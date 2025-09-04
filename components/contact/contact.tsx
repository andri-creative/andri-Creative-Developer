import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const Contact = () => {
  return (
    <>
      <Card>
        <CardHeader className="gap-3 p-2 md:px-6 w-full">
          <CardTitle className="text-3xl md:text-4xl font-bold">
            Contact
          </CardTitle>
          <CardDescription>Let`s get in touch</CardDescription>
          <span className="block border-t border-dashed border-gray-800"></span>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="grid grid-cols-1 gap-6">
            <CardTitle className="text-lg md:text-lg ">
              Find me on social media
            </CardTitle>
            <Card></Card>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                
              </Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
            </div>
          </div>
          <span className="block lg:hidden border-t border-dashed border-gray-800"></span>
          <div className="grid grid-cols-1 gap-6">
            <CardTitle className="text-lg md:text-lg ">
              Or send me a message
            </CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <Card></Card>
              <Card></Card>
            </div>
            <Card></Card>
            <Card></Card>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Contact;
