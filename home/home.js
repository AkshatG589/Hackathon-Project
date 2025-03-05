// Function to populate the modal with plant details

function openLearnMore(name, originalName, botanicalName, remedies, description, image) {

    document.getElementById('modalImage').src = image;
    document.getElementById('modalOriginalName').innerText = originalName;
    document.getElementById('modalBotanicalName').innerText = botanicalName;
    document.getElementById('modalRemedies').innerText = remedies;
    document.getElementById('modalDescription').innerText = description;
}
document.getElementById("changePage").addEventListener("click",()=>{
    window.location.href = "/garden/garden.html";
})
document.getElementById("demo").addEventListener("click",()=>{
    // window.loaction.href = "/tour/tour.html"
    alert("This page is currently under maintenance")
})