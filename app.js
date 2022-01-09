
    function getValue()
{
    var Ia=document.getElementById('Ia').value;
    var Ib=document.getElementById('Ib').value;
    var Ic=document.getElementById('Ic').value;
    var Va=document.getElementById('Va').value;
    var Vb=document.getElementById('Vb').value;
    var Vc=document.getElementById('Vc').value;
    var arr=[Ia,Ib,Ic,Va,Vb,Vc];
   return arr
}
function faultAnalysis()
{
    var data=getValue();
    var flag=false;
    for(var i=0;i<6;i++)
    {
        if((data[i].charCodeAt(0)>=65 && data[i].charCodeAt(0)<=90)|| (data[i].charCodeAt(0)>=97 && data[i].charCodeAt(0)<=122) )
        {
            flag=true;
             break;
        }   
    }
    if(flag==false)
    {
        var current=[];
        var angle=[];
    //  for current Ia......................................
        var Ia=data[0];
        var ra;
       for(var i=0;i<Ia.length;i++)
       {
           if(i==Ia.indexOf("<"))
           {
               Ia=Ia.slice(0,i);
               current.push(Number(Ia));
               ra=data[0].slice(i+1);
               angle.push(Number(ra));

           }
       }
        // for current Ib.......................................
        var Ib=data[1];
        var rb;
       for(var i=0;i<Ib.length;i++)
       {
           if(i==Ib.indexOf("<"))
           {
               Ib=Ib.slice(0,i);
               current.push(Number(Ib));
               rb=data[1].slice(i+1);
               angle.push(Number(rb));

           }
       }
    //    for current Ic..........................................
        var Ic=data[2];
        var rc;
       for(var i=0;i<Ic.length;i++)
       {
           if(i==Ic.indexOf("<"))
           {
               Ic=Ic.slice(0,i);
               current.push(Number(Ic));
               rc=data[2].slice(i+1);
               angle.push(Number(rc));

           }
       }
    //console.log(current)
    //console.log(angle)
    Result(current,angle);
        
    }
    else
    {
        alert("You entered incorrect format...")
    }
    // console.log(data);
    
}
function Result(current,angle){
    angle[0]= (angle[0]*Math.PI)/180;
    angle[1]= (angle[1]*Math.PI)/180;
    angle[2]= (angle[2]*Math.PI)/180;
    var cIa=math.Complex.fromPolar(+current[0],+angle[0]);
    var cIb=math.Complex.fromPolar(+current[1],+angle[1]);
    var cIc=math.Complex.fromPolar(+current[2],+angle[2]);
    var ee= (120*Math.PI)/180;
    var ef= (240*Math.PI)/180;
    var a=math.Complex.fromPolar(1,ee);
    var a_sq=math.Complex.fromPolar(1,ef);
    var aIb=math.multiply(cIb,a);
    var a_sqI=math.multiply(cIc,a_sq);
    var Ib_a_sq=math.multiply(cIb,a_sq);
    var Ic_a=math.multiply(cIc,a)
    var I_z=math.add(cIa,cIb,cIc);
    I_z=math.divide(I_z,3);
    console.log(I_z);
    var I_p=math.add(cIa,aIb,a_sqI);
    I_p=math.divide(I_p,3);
    console.log(I_p);
    var I_n=math.add(cIa,Ib_a_sq,Ic_a);
    I_n=math.divide(I_n,3);
    console.log(I_n);
    eg=(90*Math.PI)/180;
    if(angle[0]+angle[1]+angle[2]==eg)
    {
        document.getElementById('result').innerHTML="3phase Balanced Fault";
    }
    else if(I_z.equals(I_p) && I_p.equals(I_n) && I_n.equals(I_z))
    {
        document.getElementById('result').innerHTML="Line to Ground Fault";
    }
    else if(Math.round(I_p.im)==-(Math.round(I_n.im)) && I_z==0)
    {
        document.getElementById('result').innerHTML="Line to Line Fault";
    }
    else if(I_p==math.add(I_z,I_n) && Ia!=0 && Ib!=0 && Ic!=0)
    {
        document.getElementById('result').innerHTML="Double Line to Ground Fault";
    }
    else
    {
        document.getElementById('result').innerHTML="No Fault has occured";
    }

}
