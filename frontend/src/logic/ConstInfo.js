export class BaseMapInfo
{
    constructor()
    {    

    }

    static getElementsByTagName(name)
    {
        if (name === "empty") 
        {
            return 0;
        }
        if (name === "block") 
        {
            return 1;
        }
        if (name === "birthplace")
        {
           return 9;
        }

        if (name === "head")
        {
           return 3;
        }
        if (name === "tail")
        {
           return 5;
        }
        if (name === "body")
        {
           return 4;
        }

        if (name === "gold") 
        {
        	return 2;
        }

        if (name === "end")
        {
        	return 8;
        }
    }
}


export class SlotMapInfo
{
    constructor()
    {    

    }

    static getElementsByTagName(name)
    {
        if (name === "empty") 
        {
            return 0;
        }
        if (name === "block") 
        {
            return 1;
        }
 
    }
}



