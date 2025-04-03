import Feature1 from '@/app/public/images/Landing/feature1.png'
import Feature2 from '@/app/public/images/Landing/feature2.png'
import Feature3 from '@/app/public/images/Landing/feature3.png'
import Image from 'next/image'

export function FeaturesHomeScreen(){
    return(
        <div className='flex container flex-wrap  mb-28 align-middle items-center justify-center justify-items-center:
        
        '>
            <Image src={Feature1} width={400} height={400} alt='feature'/>
            <Image src={Feature2} width={400} height={400} alt='feature'/>
            <Image src={Feature3} width={400} height={400} alt='feature'/>

        </div>
    )
}