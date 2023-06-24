$(document).ready(function(){
  
  // -[Animasi Scroll]---------------------------
  
  $(".navbar a, footer a[href='#halamanku']").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
        window.location.hash = hash;
      });
    } 
  });
  
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;
      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });

  
  // -[Prediksi Model]---------------------------
  
  // Fungsi untuk memanggil API ketika tombol prediksi ditekan
  $("#prediksi_submit").click(function(e) {
    e.preventDefault();
	
	// Set data pengukuran bunga iris dari input pengguna
    var input_pregnancies = $("#range_pregnancies").val(); 
	var input_glucose  = $("#range_glucose").val(); 
	var input_blood_pressure = $("#range_blood_pressure").val(); 
	var input_skin_thickness = $("#range_skin_thickness").val(); 
  var input_insulin = $("#range_insulin").val(); 
  var input_bmi = $("#range_bmi").val(); 
  var input_diabetes_pedigree_function = $("#range_diabetes_pedigree_function").val(); 
  var input_age = $("#range_age").val(); 

	// Panggil API dengan timeout 1 detik (1000 ms)
    setTimeout(function() {
	  try {
			$.ajax({
			  url  : "/api/deteksi",
			  type : "POST",
        data : {"pregnancies" : input_pregnancies,
        "glucose"  : input_glucose,
        "blood_pressure" : input_blood_pressure,
        "skin_thickness"  : input_skin_thickness,
        "insulin"  : input_insulin,
        "bmi"  : input_bmi,
        "diabetes_pedigree_function"  : input_diabetes_pedigree_function,
        "age"  : input_age,
           },
        
			  success:function(res){
				// Ambil hasil prediksi spesies dan path gambar spesies dari API
				res_data_prediksi   = res['prediksi']
				// res_outcome_prediksi = res['outcome_prediksi']
				
				// Tampilkan hasil prediksi ke halaman web
			    generate_prediksi(res_data_prediksi); 
			  }
			});
		}
		catch(e) {
			// Jika gagal memanggil API, tampilkan error di console
			console.log("Gagal !");
			console.log(e);
		} 
    }, 1000)
    
  })
    
  // Fungsi untuk menampilkan hasil prediksi model
  function generate_prediksi(data_prediksi) {
    var str="";
    str += "<h3>Hasil Prediksi </h3>";
    str += "<br>";
    str += "<h1>" + data_prediksi + "</h1>";
    $("#hasil_prediksi").html(str);
  }  
  
})
  
