import { useState } from 'react'
import './styles.css'
export default function App() {
  const [filter, setFilter] = useState({
    brightness: 1,
    contrast: 1,
    saturation: 1,
  })

  /* Challenge

    Range input'ları henüz hiçbir şey yapmıyor. Sizin göreviniz bunları aşağıdaki gibi çalıştırmaktır: 
    
        1. Kullanıcı range input kaydırıcılarından birini her hareket ettirdiğinde, filter state nesnesindeki karşılık gelen değer, değişmeyen diğer iki değer korunarak input değeri olacak şekilde güncellenmelidir. 
           
        2. Filter state nesnesinin her güncellemesinde, --brightness, --contrast ve 
           --saturation görüntünün filter özelliklerini kontrol eden CSS değişkenleri, karşılık gelen filter state nesne özelliklerinin değerleri olacak şekilde güncellenmelidir. İlgili CSS, styles.css dosyasının 1-13 satırlarında bulunabilir. 
		                       
        3. Range input'larının başlangıç değerleri, filter state nesnesindeki karşılık gelen özelliklerinin başlangıç değerleri olmalıdır.   
		   
		4. Kodunuzu mümkün olduğunca DRY yapmaya çalışın
*/

// Bu işlev, bir input alanının değeri değiştiğinde tetiklenecek olan olay işleyicisidir. propertyName ve value parametreleri alır. setFilter işlevi kullanılarak, önceki filtre durumunu (...pre) yayılım operatörü ile kopyalar ve ardından propertyName ile belirtilen özelliğin değerini value ile günceller. Ayrıca, document.documentElement.style.setProperty() yöntemi kullanılarak, CSS değişkeni (--propertyName) de güncellenir. //
const handleInputChange = (propertyName,value) => {
  setFilter((pre) => ({
    ...pre,
    [propertyName]: value 
  }))
  document.documentElement.style.setProperty(`--${propertyName}`,value)
}


  return (
    <div className='main-container'>
      <h1>
        <span>📷</span> Photo Editörü <span>📷</span>
      </h1>

      <div className='image-container'>
        <img src='./images/kunal-goswami-CuUn__aMGD4-unsplash.jpg' />
      </div>

      <form>

      {/* Object.entries(filter) yöntemi kullanılarak, filter nesnesinin key ve value içeren bir [dizi] oluşturulur. Bu dizi map() fonksiyonu ile döngüye alınır ve her bir key ve value çifti için bir input alanı oluşturulur. Bu input alanları, range türünde olup, kullanıcının filtre değerlerini ayarlamasına izin verir. Değerler, filter state'inden alınır ve handleInputChange işlevi ile değiştirilir. Her bir input alanının yanında, filtrenin adının baş harfi büyük olacak şekilde görünen bir etiket bulunur. */}
        {Object.entries(filter).map(([property,value]) => (

          <label key={property}>
         <input
          type='range' 
          name={property}
          // input alanının başlangıç değerini belirler. //
          defaultValue={filter[property]} 
          onChange={(e) => handleInputChange(property , e.target.value)}
          value={value} 
           min={0}
           max={2} 
           step={0.1} 
          />
          <span>{property.charAt(0).toUpperCase() + property.slice(1)}</span>
        </label>
          ))}
      </form>
    </div>
  )
}
      // DRY değil //

// <div className='main-container'>
// <h1>
//   <span>📷</span> Photo Editörü <span>📷</span>
// </h1>

// <div className='image-container'>
//   <img src='./images/kunal-goswami-CuUn__aMGD4-unsplash.jpg' />
// </div>

// <form>
//   <label>
//    <input
//     type='range' 
//     name='brightness' 
//     // input alanının başlangıç değerini belirler. //
//     defaultValue={filter.brightness} 

//     // input alanının değeri her değiştiğinde tetiklenir. Bu olay yeni değeri alır filtre durumunu günceller ve CSS değişkenini günceller. //
//     onChange={(e) => {
//       const newBrightness =  e.target.value; 
//       setFilter({...filter,brightness: newBrightness})
//       document.documentElement.style.setProperty("--brightness",newBrightness)
//   }}
//      value={filter.brightness}
//     min={0} max={2} step={0.1}
//      />
//     <span>Brightness</span>
//   </label>

//   <label>
//     <input 
//     type='range' 
//     name='contrast' 
//     defaultValue={filter.contrast} 
//     onChange={(e) => {
//       const newContrast = e.target.value;
//       setFilter({...filter,contrast: newContrast})
//       document.documentElement.style.setProperty("--contrast",newContrast)
//     }}
//       value={filter.contrast}
//      min={0} max={2} step={0.1} 
//      />
//     <span>Contrast</span>
//   </label>

//   <label>
//     <input 
//     type='range' 
//     name='saturation' 
//     defaultValue={filter.saturation} 
//     onChange={(e) => {
//       const newSaturation = e.target.value;
//       setFilter({...filter,saturation: newSaturation })
//       document.documentElement.style.setProperty("--saturation",newSaturation)
//   }}
//    value={filter.saturation} 
//     min={0} max={2} step={0.1} 
//     />
//     <span>Saturation</span>
//   </label>
// </form>
// </div>