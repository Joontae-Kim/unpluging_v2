$(function() {
	// $('.page_title_header').append('<span class="current-index"></span> / 4')
	$('#guidepop').popover({content: "해당 사항을 선택하시면 보다 정확하고, 편리하게 이용하실 수 있습니다!"})
	$('#guidepop').popover('show');
	setTimeout(function () {
		$('#guidepop').popover('hide');
	}, 2000);
	var slider = $('.bxslider').bxSlider({
        nextSelector: '#slider-next',
        // prevSelector: '#slider-prev',
		auto: false,
		mode:'horizontal', //'horizontal' //fade
		touchEnabled: false,
		adaptiveHeight: true,
		infiniteLoop: false,
		pager: false,
		controls: true,
        nextText: '<button type="button" id="slidepass" class="btn btn-primary btn-block disabled" > 선택완료 <span id="slidepass_count">0</span> / 2 </button>',
	    onSliderLoad: function (currentIndex){
	        $('.page_title_header .current-index').text(currentIndex + 1);
	        var prev = currentIndex + 1;
	        switch(prev) {
			    case 1:
			    	$("#page_title_h4").text(prev+". 요금 기본사항");
			    	$("#slidepass").click(userbill);
			        break;
			    case 2:
				    $("#page_title_h4").text(prev+". 가전제품 간편선택");
			        break;
			    case 3:
			    	$("#page_title_h4").text(prev+". 사용패턴 선택");
			        $('[data-toggle="popover"]').popover({content: "가전제품 사용유무에 따라 아래의 제품을!"});
			        break;
			}
	    },
	    onSlideBefore: function ($slideElement, oldIndex, newIndex){
	        var next = newIndex + 1;
	        switch(next) {
			    case 1:
			    	$("#page_title_h4").text(next+". 요금 기본사항");
			        break;
			    case 2:
					$('#guidepop').popover('destroy');
					setTimeout(function () {
						$('#guidepop').popover({content: "사용중인 가전제품을 선택해주세요!"});
						$("#guidepop").popover('show');
					}, 1500);
				  	setTimeout(function () {
				    	$('#guidepop').popover('hide');
				  	}, 4500);
				    $("#page_title_h4").text(next+". 가전제품 간편선택용");
			        $("#slidepass").text("선택완료");
			        $("#slidepass").on("click",kkk);
			        break;
			    case 3:
			    	$("#page_title_h4").text(next+". 사용패턴 선택");
					$('#guidepop').popover('destroy');
					setTimeout(function () {
						$('#guidepop').popover({content: "사용중인 가전제품의 유형과 사용주기, 사용시간을 선택하시고 추가해주세요!"});
						$("#guidepop").popover('show');
					}, 1500);
				  	setTimeout(function () {
				    	$('#guidepop').popover('hide');
				  	}, 4500);
			    	$("#slidepass").text("선택제품 보기");
			    	$("#slidepass").css("display","none");
			    	$("#checkupChoice").css("display","initial");
			        break;
			}	        
	    }
	});

	// 1st slide form validation
	$('#necform input').on('change', function() {
		var chk = $('input[name="house"]').is(":checked")
		var chk1 = $('input[name="family"]').is(":checked")
		if(chk && chk1) {
			$('#slidepass').removeClass('disabled');
			$('.outside').css('pointer-events','auto')
			$("#slidepass_count").text("2");
		} else {
			$('#slidepass').addClass('disabled');
			$('.outside').css('pointer-events','none')
			$("#slidepass_count").text("1");
		}
	});	

	//choose familytype and print it's appliance group
	$("#family1, #family2, #family3").change(function(){
		var chk = $(this).is(":checked");
		if(chk) {
		  sidechkr(this.id);
		} else{
		  sidechkr(this.id);
		}
	});

	//familytype switch script before appliance recommendation appliance script
	var sidechkr = function(id) {
		var groupid = id + "Group";
	    switch(groupid) {
	        case "family1Group":
	        case "family2Group":
	          sidechkr2(family_type12, id);
	          break;
	        case "family3Group":
	          sidechkr2(family_type3, id);
	          break;
	    }	    
	}

	//auto checking to 1st slide's family type
	var sidechkr2 = function(group,id) {
		$(".tab-content input[type=checkbox]:checked").prop("checked",false);    
		var state = $("#"+id).is(":checked");
		$("#labelbox span").remove();
		if (state) {
		    $.each(group, function (index, value) {
		      var itmeid= value.Id;
				var labelid = "label"+itmeid;
				$("#"+itmeid).prop('checked', state);
					var item_nm = $('#'+itmeid).attr('name');
					var item_val = $("#"+itmeid).val();
					addlabel(item_nm, labelid, item_val);
		    })
		}		
	labelcount();	
	};

	// 2nd slide add and check to using appliance 
	$('.tab-content input[type="checkbox"]').on('change', function() {
		var chk = $('#'+this.id).is(":checked");
		var labelnm = this.name;
		var labelid = "label" + this.id;
		var labeltxt = this.value;
		var labelex = $('#'+labelid).is('#'+labelid);
		if (labelex || !chk) {
			$("#" + labelid).remove();
		} else {
			addlabel(labelnm, labelid, labeltxt);
		}
	labelcount();
	});

	// count appalinace labels
	var labelcount = function () {
		var label_len = $("#labelbox .label").length;
		$("#appliance_count").html(label_len);
	}

	//create 2nd slide's no-chking appliane array
	var kkk = function() {  
		var delarr = new Array();
		$('.tab-content input[type="checkbox"]').each(function() {
			var kkk = $("#"+this.id).prop("checked");
				if(!kkk) {
			  	delarr.push("slide_"+this.id);
			}
		})
	slidefade(delarr);
	};

	//write period_sel to period text
	$('#selday').on('change',function() {
		var txt2 = $("#selday option:selected").data('read');
		$('#period').html(txt2);
	});

	//write hour_sel to hour text
	$('#selhr').on('change',function() {
		var txt = $("#selhr option:selected").text();
		$('#hour').html(txt);
	});	
});

var addlabel = function (labeltype, labelid, labeltext) {
    switch(labeltype) {
	    case 'nec':
	    	$("#labelbox").append('<span class="label appliance_label label-success" id='+labelid+'>' + labeltext + '</span>')
	        break;
	    case 'sub':
		    $("#labelbox").append('<span class="label appliance_label label-warning" id='+labelid+'>' + labeltext + '</span>')
	        break;
	    case 'season':
	    	$("#labelbox").append('<span class="label appliance_label label-info" id='+labelid+'>' + labeltext + '</span>')
	        break;
	}
};