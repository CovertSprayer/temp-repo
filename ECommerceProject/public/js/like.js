

async function likeProduct(productId, btn){
    try {
        const response = await axios({
            method: 'post',
            url: `/products/${productId}/like`,
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        });
    
        if(btn.classList.contains('far')){
            btn.classList.remove('far');
            btn.classList.add('fas');
        }
        else{
            btn.classList.remove('fas');
            btn.classList.add('far');
        }
    } 
    catch (error) {
        window.location.replace('/login');
    }
}

window.document.addEventListener('click', (e)=>{
    const element = e.target
    
    if(element.classList.contains('product-like-button')){
        const productId = element.getAttribute('product-id')
        likeProduct(productId, element);
    }
})
