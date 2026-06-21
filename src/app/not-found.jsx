
import Image from "next/image";

const NotFound = () => {
    return (
        <div className="col-span-full py-24 text-center space-y-4">
            <div className="flex items-center justify-center mx-auto text-muted-foreground">
              <Image
                         src="/assets/error-404.png"  width={676}
            height={401}
                         alt="error-404" 
                       />
            </div>
            <h3 className="text-xl font-bold">Oops! That Page Can’t Be Found.</h3>
            <p className="text-muted-foreground">The page you are looking for was never existed.</p>
        </div>
    );
};

export default NotFound;